// import moment from 'moment';
import burrito from './burritoTemplate.json';

// Define TypeScript interfaces based on the burrito structure
// interface PackageInfo {
//   version: string;
// }

// interface ProjectFields {
//   projectName: string;
//   abbreviation: string;
// }

// Book name structure
interface BookName {
  en: string;
}

// Book naming structure
interface BookNaming {
  short: BookName;
  abbr: BookName;
  long: BookName;
}

// Define the structure of the burrito object
interface ScriptureBurrito {
  format: string;
  meta: {
    version: string;
    category: string;
    generator: {
      softwareName: string;
      softwareVersion: string;
      userName: string;
    };
    defaultLocale: string;
    dateCreated: string;
    normalization: string;
  };
  idAuthorities: {
    scribe: {
      id: string;
      name: {
        en: string;
      };
    };
  };
  identification: {
    primary: any;
    name: {
      en: string;
    };
    abbreviation: {
      en: string;
    };
  };
  confidential: boolean;
  languages: Array<{
    tag: string;
    name: {
      en: string;
    };
    scriptDirection: string;
  }>;
  type: {
    flavorType: {
      name: string;
      flavor: {
        name: string;
        projectType: string;
        translationType: string;
        audience: string;
        usfmVersion: string;
      };
      currentScope: {
        [key: string]: any[];
      };
    };
  };
  copyright: {
    licenses: Array<{
      ingredient: string;
    }>;
  };
  localizedNames: Record<string, BookNaming>;
  ingredients: Record<string, any>;
}

const createTranslationSB = (
  data: any
): Promise<ScriptureBurrito> => {
  // let localizedNames: Record<string, BookNaming> = {};

  return new Promise((resolve) => {
    // burrito.meta.generator.userName = data.name;
    // burrito.meta.generator.softwareVersion = version;
    // burrito.identification.primary = {
    //   scribe: {
    //     [id]: {
    //       revision: '1',
    //       timestamp: moment().format(),
    //     },
    //   },
    // };
    // burrito.languages[0].tag = langCode;
    // burrito.languages[0].scriptDirection = direction.toLowerCase();
    burrito.identification.name.en = data.name;
    // burrito.identification.abbreviation.en = projectFields.abbreviation;
    burrito.languages[0].name.en = data.targetLanguage;
    burrito.idAuthorities.scribe.id = 'http://www.scribe.bible';
    burrito.copyright.licenses[0].ingredient = 'license.md';

    // selectedScope.forEach((scope) => {
    //   burrito.type.flavorType.currentScope[scope] = [];
    //   localizedNames[scope] = burrito.localizedNames[scope];
    // });

    // burrito.localizedNames = localizedNames;
    resolve(burrito as ScriptureBurrito);
  });
};

export default createTranslationSB;