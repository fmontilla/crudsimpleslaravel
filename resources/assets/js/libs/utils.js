
export function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export function clone_not_null (value) {
    let newObject = {}
    for (let key in value) {
        if ((value[key] !== null && value[key] instanceof Array && (value[key]).length > 0) || (value[key] !== null && (value[key] instanceof Array) === false)) {
            newObject[key] = value[key];
        }
    }
    return newObject;
}
