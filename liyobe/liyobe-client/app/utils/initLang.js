export const InitLang = (lang, listLang) => {
    const name = {};
    listLang.forEach(x => {
        name[x._id] = lang && lang[x._id] !== undefined ? lang[x._id] : '';
    })
    return name;
} 