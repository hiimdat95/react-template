using liyobe.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace liyobe.Data
{
    public class DbInitializer
    {
        private readonly AppDbContext _context;
        private UserManager<AppUser> _userManager;
        private RoleManager<AppRole> _roleManager;

        public DbInitializer(AppDbContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Seed()
        {
            if (!_roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Admin",
                    NormalizedName = "Admin",
                    Description = "Top manager"
                });
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Staff",
                    NormalizedName = "Staff",
                    Description = "Staff"
                });
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Customer",
                    NormalizedName = "Customer",
                    Description = "Customer"
                });
            }
            if (!_userManager.Users.Any())
            {
                await _userManager.CreateAsync(new AppUser()
                {
                    UserName = "admin",
                    FullName = "Administrator",
                    Email = "admin@gmail.com",
                    Balance = 0,
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Status = true
                }, "123654$");
                var user = await _userManager.FindByNameAsync("admin");
                await _userManager.AddToRoleAsync(user, "Admin");

                await _userManager.CreateAsync(new AppUser()
                {
                    UserName = "ltdat",
                    FullName = "Le Tien Dat",
                    Email = "letiendat2808@gmail.com",
                    Balance = 0,
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Status = true
                }, "123654$");
                var ltdat = await _userManager.FindByNameAsync("ltdat");
                await _userManager.AddToRoleAsync(ltdat, "Staff");
            }
            //if (!_context.Contacts.Any())
            //{
            //    _context.Contacts.Add(new Contact()
            //    {
            //        Id = CommonConstants.DefaultContactId,
            //        Address = "No 36 Lane 133 Nguyen Phong Sac Cau Giay",
            //        Email = "pandashop@gmail.com",
            //        Name = "Panda Shop",
            //        Phone = "0942 324 543",
            //        Status = true,
            //        Website = "http://pandashop.com",
            //        Lat = 21.0435009,
            //        Lng = 105.7894758
            //    });
            //}
            if (_context.Locales.Count() == 0)
            {
                _context.Locales.AddRange(new List<Locale>()
                {
                    new Locale() { Id = "en", LocaleName = "English", Description = "English", SortOrder = 1, Status = true },
                    new Locale() { Id = "vi", LocaleName = "Vietnamese", Description = "Vietnamese", SortOrder = 2, Status = true },
                    new Locale() { Id = "ko", LocaleName = "Korean", Description = "Korean", SortOrder = 3, Status = true },
                    new Locale() { Id = "ja", LocaleName = "Japanese", Description = "Japanese", SortOrder = 4, Status = true },
                    new Locale() { Id = "zh", LocaleName = "Chinese", Description = "Chinese", SortOrder = 5, Status = true },
                });
            }
            if (_context.Functions.Count() == 0)
            {
                _context.Functions.AddRange(new List<Function>()
                {
                    new Function() {Id="DASHBOARD",Name="DASHBOARD",ParentId=null,SortOrder=0,Status=true,URL="/dashboard",IconCss="simple-icon-home"},
                    new Function() {Id="SYSTEMMANAGE",Name="SYSTEMMANAGE",ParentId=null,SortOrder=2,Status=true,URL="/dashboard/system",IconCss="simple-icon-settings"},
                    new Function() {Id="FUNCTION",Name="FUNCTION",ParentId="SYSTEMMANAGE",SortOrder=2,Status=true,URL="/dashboard/system/function",IconCss="simple-icon-grid"},
                    new Function() {Id="SETTING",Name="SETTING",ParentId="SYSTEMMANAGE",SortOrder=4,Status=true,URL="/dashboard/system/setting",IconCss="simple-icon-screen-desktop"},
                    new Function() {Id="LOCALE",Name="LOCALE",ParentId="SYSTEMMANAGE",SortOrder=4,Status=true,URL="/dashboard/system/locale",IconCss="simple-icon-globe"},
                    new Function() {Id="IMAGE",Name="IMAGE",ParentId="SYSTEMMANAGE",SortOrder=4,Status=true,URL="/dashboard/system/image",IconCss="simple-icon-camera"},
                    new Function() {Id="ACCOUNTMANAGE",Name="ACCOUNTMANAGE",ParentId=null,SortOrder=1,Status=true,URL="/dashboard/account",IconCss="simple-icon-user"},
                    new Function() {Id="ROLE",Name="ROLE",ParentId="ACCOUNTMANAGE",SortOrder=3,Status=true,URL="/dashboard/account/role",IconCss="simple-icon-briefcase"},
                    new Function() {Id="USER",Name="USER",ParentId="ACCOUNTMANAGE",SortOrder=2,Status=true,URL="/dashboard/account/user",IconCss="simple-icon-people"},
                    new Function() {Id="PERMISSION",Name="PERMISSION",ParentId="ACCOUNTMANAGE",SortOrder=4,Status=true,URL="/dashboard/account/permission",IconCss="simple-icon-list"},
                    new Function() {Id="CHANGEPASS",Name="CHANGEPASS",ParentId="ACCOUNTMANAGE",SortOrder=4,Status=true,URL="/dashboard/account/changepass",IconCss="simple-icon-lock-open"},
                    new Function() {Id="PAGELANDING",Name="PAGELANDING",ParentId=null,SortOrder=3,Status=true,URL="/dashboard/pagelanding/",IconCss="simple-icon-screen-desktop"},
                    new Function() {Id="HEADMENU",Name="HEADMENU",ParentId="PAGELANDING",SortOrder=1,Status=true,URL="/dashboard/pagelanding/headmenu",IconCss="simple-icon-drawer"},
                    new Function() {Id="SECONDMENU",Name="SECONDMENU",ParentId="PAGELANDING",SortOrder=2,Status=true,URL="/dashboard/pagelanding/secondmenu",IconCss="simple-icon-drawer"},
                    new Function() {Id="CAROUSELHOME",Name="CAROUSELHOME",ParentId="PAGELANDING",SortOrder=3,Status=true,URL="/dashboard/pagelanding/carouselhome",IconCss="simple-icon-film"},
                    new Function() {Id="FEATURECAROUSELHOME",Name="FEATURECAROUSELHOME",ParentId="PAGELANDING",SortOrder=4,Status=true,URL="/dashboard/pagelanding/featurecarouselhome",IconCss="simple-icon-film"},
                    new Function() {Id="TOUR",Name="TOUR",ParentId="PAGELANDING",SortOrder=5,Status=true,URL="/dashboard/pagelanding/tour",IconCss="simple-icon-plane"},
                    new Function() {Id="CONFIG",Name="CONFIG",ParentId="PAGELANDING",SortOrder=6,Status=true,URL="/dashboard/pagelanding/config",IconCss="simple-icon-screen-desktop"},
                });
            }

            //if (_context.Footers.Count(x => x.Id == CommonConstants.DefaultFooterId) == 0)
            //{
            //    string content = "Footer";
            //    _context.Footers.Add(new Footer()
            //    {
            //        Id = CommonConstants.DefaultFooterId,
            //        Content = content
            //    });
            //}

            //if (_context.Colors.Count() == 0)
            //{
            //    List<Color> listColor = new List<Color>()
            //    {
            //        new Color() {Name="Black", Code="#000000" },
            //        new Color() {Name="White", Code="#FFFFFF"},
            //        new Color() {Name="Red", Code="#ff0000" },
            //        new Color() {Name="Blue", Code="#1000ff" },
            //    };
            //    _context.Colors.AddRange(listColor);
            //}
            //if (_context.AdvertistmentPages.Count() == 0)
            //{
            //    List<AdvertistmentPage> pages = new List<AdvertistmentPage>()
            //    {
            //        new AdvertistmentPage() {Id="home", Name="Home",AdvertistmentPositions = new List<AdvertistmentPosition>(){
            //            new AdvertistmentPosition(){Id="home-left",Name="Bên trái"}
            //        } },
            //        new AdvertistmentPage() {Id="product-cate", Name="Product category" ,
            //            AdvertistmentPositions = new List<AdvertistmentPosition>(){
            //            new AdvertistmentPosition(){Id="product-cate-left",Name="Bên trái"}
            //        }},
            //        new AdvertistmentPage() {Id="product-detail", Name="Product detail",
            //            AdvertistmentPositions = new List<AdvertistmentPosition>(){
            //            new AdvertistmentPosition(){Id="product-detail-left",Name="Bên trái"}
            //        } },
            //    };
            //    _context.AdvertistmentPages.AddRange(pages);
            //}

            //if (_context.Slides.Count() == 0)
            //{
            //    List<Slide> slides = new List<Slide>()
            //    {
            //        new Slide() {Name="Slide 1",Image="/client-side/images/slider/slide-1.jpg",Url="#",DisplayOrder = 0,GroupAlias = "top",Status = true },
            //        new Slide() {Name="Slide 2",Image="/client-side/images/slider/slide-2.jpg",Url="#",DisplayOrder = 1,GroupAlias = "top",Status = true },
            //        new Slide() {Name="Slide 3",Image="/client-side/images/slider/slide-3.jpg",Url="#",DisplayOrder = 2,GroupAlias = "top",Status = true },

            //        new Slide() {Name="Slide 1",Image="/client-side/images/brand1.png",Url="#",DisplayOrder = 1,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 2",Image="/client-side/images/brand2.png",Url="#",DisplayOrder = 2,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 3",Image="/client-side/images/brand3.png",Url="#",DisplayOrder = 3,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 4",Image="/client-side/images/brand4.png",Url="#",DisplayOrder = 4,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 5",Image="/client-side/images/brand5.png",Url="#",DisplayOrder = 5,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 6",Image="/client-side/images/brand6.png",Url="#",DisplayOrder = 6,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 7",Image="/client-side/images/brand7.png",Url="#",DisplayOrder = 7,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 8",Image="/client-side/images/brand8.png",Url="#",DisplayOrder = 8,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 9",Image="/client-side/images/brand9.png",Url="#",DisplayOrder = 9,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 10",Image="/client-side/images/brand10.png",Url="#",DisplayOrder = 10,GroupAlias = "brand",Status = true },
            //        new Slide() {Name="Slide 11",Image="/client-side/images/brand11.png",Url="#",DisplayOrder = 11,GroupAlias = "brand",Status = true },
            //    };
            //    _context.Slides.AddRange(slides);
            //}

            //if (_context.Sizes.Count() == 0)
            //{
            //    List<Size> listSize = new List<Size>()
            //    {
            //        new Size() { Name="XXL" },
            //        new Size() { Name="XL"},
            //        new Size() { Name="L" },
            //        new Size() { Name="M" },
            //        new Size() { Name="S" },
            //        new Size() { Name="XS" }
            //    };
            //    _context.Sizes.AddRange(listSize);
            //}

            //if (_context.ProductCategories.Count() == 0)
            //{
            //    List<ProductCategory> listProductCategory = new List<ProductCategory>()
            //    {
            //        new ProductCategory() { Name="Men shirt",SeoAlias="men-shirt",ParentId = null,Status=true,SortOrder=1,
            //            Products = new List<Product>()
            //            {
            //                new Product(){Name = "Product 1",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-1",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 2",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-2",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 3",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-3",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 4",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-4",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 5",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-5",Price = 1000,Status = true,OriginalPrice = 1000},
            //            }
            //        },
            //        new ProductCategory() { Name="Women shirt",SeoAlias="women-shirt",ParentId = null,Status=true ,SortOrder=2,
            //            Products = new List<Product>()
            //            {
            //                new Product(){Name = "Product 6",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-6",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 7",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-7",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 8",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-8",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 9",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-9",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 10",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-10",Price = 1000,Status = true,OriginalPrice = 1000},
            //            }},
            //        new ProductCategory() { Name="Men shoes",SeoAlias="men-shoes",ParentId = null,Status=true ,SortOrder=3,
            //            Products = new List<Product>()
            //            {
            //                new Product(){Name = "Product 11",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-11",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 12",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-12",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 13",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-13",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 14",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-14",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 15",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-15",Price = 1000,Status = true,OriginalPrice = 1000},
            //            }},
            //        new ProductCategory() { Name="Woment shoes",SeoAlias="women-shoes",ParentId = null,Status=true,SortOrder=4,
            //            Products = new List<Product>()
            //            {
            //                new Product(){Name = "Product 16",DateCreated=DateTime.Now, Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-16",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 17",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-17",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 18",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-18",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 19",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-19",Price = 1000,Status = true,OriginalPrice = 1000},
            //                new Product(){Name = "Product 20",DateCreated=DateTime.Now,Image="/client-side/images/products/product-1.jpg",SeoAlias = "san-pham-20",Price = 1000,Status = true,OriginalPrice = 1000},
            //            }}
            //    };
            //    _context.ProductCategories.AddRange(listProductCategory);
            //}

            if (!_context.SystemConfigs.Any(x => x.Id == "HomeTitle"))
            {
                _context.SystemConfigs.Add(new SystemConfig()
                {
                    Id = "HomeTitle",
                    Name = "Home's title",
                    Value1 = "Tedu Shop home",
                    Status = true
                });
            }
            if (!_context.SystemConfigs.Any(x => x.Id == "HomeMetaKeyword"))
            {
                _context.SystemConfigs.Add(new SystemConfig()
                {
                    Id = "HomeMetaKeyword",
                    Name = "Home Keyword",
                    Value1 = "shopping, sales",
                    Status = true
                });
            }
            if (!_context.SystemConfigs.Any(x => x.Id == "HomeMetaDescription"))
            {
                _context.SystemConfigs.Add(new SystemConfig()
                {
                    Id = "HomeMetaDescription",
                    Name = "Home Description",
                    Value1 = "Home tedu",
                    Status = true
                });
            }
            await _context.SaveChangesAsync();
        }
    }
}