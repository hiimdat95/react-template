using liyobe.GatewayOcelot.Consts;
using liyobe.GatewayOcelot.Extensions;
using Newtonsoft.Json.Linq;
using Serilog;
using System;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace liyobe.GatewayOcelot.DelegatingHandlers
{
    public class ConvertStatusCodeHandler : DelegatingHandler
    {
        private const string StatusCodePath = "metadata.code";

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var result = await base.SendAsync(request, cancellationToken);
            try
            {
                if (result.StatusCode == HttpStatusCode.OK)
                {
                    var content = await GetContentBody(result.Content);
                    var jContent = JObject.Parse(content);
                    var statusCodeToken = jContent.SelectToken(StatusCodePath);
                    if (!statusCodeToken.IsNullOrEmpty())
                    {
                        result.StatusCode = (HttpStatusCode)statusCodeToken.Value<int>();
                        result.ReasonPhrase = result.StatusCode.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Logger.Error(ex, "Cannot read status code from body");
            }

            return result;
        }

        private async Task<string> GetContentBody(HttpContent httpContent)
        {
            string content;
            if (httpContent.Headers.ContentEncoding.Any())
            {
                var buffer = await httpContent.ReadAsByteArrayAsync();
                byte[] unzipBuffer = buffer;
                foreach (var encoding in httpContent.Headers.ContentEncoding)
                {
                    unzipBuffer = Decompress(unzipBuffer, encoding);
                }

                content = Encoding.UTF8.GetString(unzipBuffer);
            }
            else
            {
                content = await httpContent.ReadAsStringAsync();
            }

            return content;
        }

        private byte[] Decompress(byte[] data, string contentEncoding)
        {
            using (var compressedStream = new MemoryStream(data))
            {
                using (var decompressStream = GetDecompressStream(compressedStream, contentEncoding))
                {
                    using (var resultStream = new MemoryStream())
                    {
                        decompressStream.CopyTo(resultStream);
                        return resultStream.ToArray();
                    }
                }
            }
        }

        private Stream GetDecompressStream(Stream inputStream, string contentEncoding)
        {
            Stream compressionStream;
            switch (contentEncoding)
            {
                case ContentEncoding.GZip:
                    compressionStream = new GZipStream(inputStream, CompressionMode.Decompress);
                    break;

                case ContentEncoding.Deflate:
                    compressionStream = new DeflateStream(inputStream, CompressionMode.Decompress);
                    break;

                case ContentEncoding.Brotli:
                    compressionStream = new BrotliStream(inputStream, CompressionMode.Decompress);
                    break;

                default:
                    throw new ArgumentException("Not recognized content encoding to be compressed to.", "contentEncoding");
            }

            return compressionStream;
        }
    }
}