namespace liyobe.Utilities.Constants
{
    public class CommonConstant
    {
        public const string AppSettings = "appsettings.json";
        public const string DefaultConnect = "DefaultConnection";
        public const string MigrationsAssembly = "liyobe.Data";
        public const string Empty = "";
        public const string AccessToken = "access_token";
        public const string ExpiresIn = "expires_in";
        public const string TokenType = "token_type";
        public const string SercurityKey = "SuperSecureKey";

        //Include
        public const string IncludeCulFromLang = "LanguageCountry.CultureLangs.Language";

        public const string IncludeDeptLang = "DepartmentLang.Language";
        public const string IncludeDeptLangDetail = "DepartmentLang.Language.LanguageCountry.CultureLangs.Language";
        public const string IncludePartDeptLang = "Department.DepartmentLang.Language";
        public const string IncludePartLang = "PartLang.Language";
        public const string IncludePartParentLang = "Parent.PartLang.Language";
        public const string IncludePartLangDetail = "PartLang.Language.LanguageCountry.CultureLangs.Language";
        public const string IncludeCulLang = "CultureLangs.Language";
        public const string IncludeCulLangDetail = "CultureLangs.Language.LanguageCountry.CultureLangs.Language";
        public const string IncludeLangCul = "FunctionLanguages.Language";
        public const string IncludeLangCulDetail = "FunctionLanguages.Language.LanguageCountry.CultureLangs.Language";
        public const string IncludeParentLangCul = "Parent.FunctionLanguages.Language";

        //Search Element
        public const string ID = "id";

        public const string Name = "name";
        public const string CulName = "culname";
        public const string ParentName = "parentname";

        //ID Enity
        public const string NewLangId = "LANG";

        public const string FormatLangId = "00000";

        //Status Request
        public const int BadRequestStatus = 400;
    }
}