import { BadRequest } from "http-errors";

export const stringToArray = async (toParse: string[] | string): Promise<string[]> => {
   if (Array.isArray(toParse)) {
      //input toPase already array
      return toParse;
   } else {
      try {
         const str = toParse.toString();
         const arrString: string = str.replace(/'/g, '"');
         const parsed: string[] = JSON.parse(arrString);
         const validated = parsed.map(str => uuidValidator(str));
         return validated;
      } catch (err) {
         const parseError = new BadRequest(`input array parse exception: ${err.message}`);
         throw parseError;
      }
   }
};

const uuidValidator = (str: string): string => {
   const isUUID = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(str);
   if (!isUUID) {
      const error = new Error(`input string: ${str}is not match in uuid pattern`);
      throw error;
   }
   return str;
};
