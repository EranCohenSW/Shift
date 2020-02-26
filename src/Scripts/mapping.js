function mapString(str) {
    let i = str.length;
    let mappedStr = "";
    while (i--) {
        mappedStr = mappedStr + mapCharecter(str.charAt(i));
    }
    return mappedStr;
}

function reverseString(str) {
    if (str.length > 0) {
        let splitString = str.split(""); 
        let reverseArray = splitString.reverse(); 
        let joinArray = reverseArray.join(""); 
        return joinArray; 
    } 
    return "";
}

function mapCharecter(ch) {
    switch (ch.toString().toLowerCase()) {
        case "a": return 'ש';
        case "b": return 'נ';
        case "c": return 'ב';
        case "d": return 'ג';
        case "e": return 'ק';
        case "f": return 'כ';
        case "g": return 'ע';
        case "h": return 'י';
        case "i": return 'ן';
        case "j": return 'ח';
        case "k": return 'ל';
        case "l": return 'ך';
        case "m": return 'צ';
        case "n": return 'מ';
        case "o": return 'ם';
        case "p": return 'פ';
        case "q": return '/';
        case "r": return 'ר';
        case "s": return 'ד';
        case "t": return 'א';
        case "u": return 'ו';
        case "v": return 'ה';
        case "w": return '\'';
        case "x": return 'ס';
        case "y": return 'ט';
        case "z": return 'ז';
        case ",": return 'ת';
        case ".": return 'ץ';
        case ";": return 'ף';        
        case "`": return ';';
        
        case "א": return 't';
        case "ב": return 'c';
        case "ג": return 'd';
        case "ד": return 's';
        case "ה": return 'v';
        case "ו": return 'u';
        case "ז": return 'z';
        case "ח": return 'j';
        case "ט": return 'y';
        case "י": return 'h';
        case "כ": return 'f';
        case "ל": return 'k';
        case "מ": return 'n';
        case "נ": return 'b';
        case "ס": return 'x';
        case "ע": return 'g';
        case "פ": return 'p';
        case "צ": return 'm';
        case "ק": return 'e';
        case "ר": return 'r';
        case "ש": return 'a';
        case "ת": return ',';
        case "ך": return 'l';
        case "ף": return ';';
        case "ץ": return '.';
        case "ם": return 'o';
        case "ן": return 'i';
        case "\'": return 'w';

        default: return ch.toString().toLowerCase();
    }
}