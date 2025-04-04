/* eslint-disable @typescript-eslint/no-explicit-any */
import { set } from 'lodash';

export const expandObj = (obj: Record<string, unknown>): Record<string, unknown> => {
  const expanded = {};

  for (const [key, value] of Object.entries(obj)) {
    set(expanded, key, value);
  }

  return expanded;
};

export const flattenObj = (
  obj: Record<string, unknown>,
  parent?: string
): Record<string, unknown> => {
  const flattened = {} as Record<string, unknown>;

  Object.keys(obj).forEach((key) => {
    const computedKey = `${parent ? parent + '.' : ''}${key}`;
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObj({ ...value }, computedKey));
    } else {
      flattened[computedKey] = value;
    }
  });

  return flattened;
};

export function flattenDeepObj(
  obj: Record<string, any>,
  parentKey = '',
  depth = Infinity
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];
    const _key = parentKey ? parentKey + '.' + key : key;
    if (typeof value == 'object' && depth > 0) {
      // here write code for depth logic like if depth >0 then only flat that
      // reduce the value of depth we found array.
      if (Array.isArray(value)) {
        depth--;
      }
      const childObject = flattenDeepObj(value, _key, depth);

      for (const childKey in childObject) {
        if (!childObject.hasOwnProperty(childKey)) continue;
        result[childKey] = childObject[childKey];
      }
    } else {
      result[_key] = value;
    }
  }

  return result;
}

export function expandDeepObj(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const keys = key.split('.');
    let currentObj = result;

    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];

      if (i < keys.length - 1) {
        // Create nested objects if they don't exist
        if (!currentObj[currentKey]) {
          // Check if the next key is a number, indicating an array
          currentObj[currentKey] = isNaN(Number(keys[i + 1])) ? {} : [];
        }
        currentObj = currentObj[currentKey];
      } else {
        // Assign the final value to the innermost object or array
        currentObj[currentKey] = obj[key];
      }
    }
  }

  return result;
}

export type RemoveSBFieldsProps = {
  excludingArray: Array<string>;
  hideArrayFields?: Array<string>;
  flatObject?: { [key: string]: any };
};

/**
 * @description To Hidden Certain fields use this function, if you pass
 * @return argtype from function
 * @todo also Add Group in login
 * add this below field in flatten object
 * table: { disable: true }
 */

export const RemoveSBFields = ({
  excludingArray,
  hideArrayFields,
  flatObject,
}: RemoveSBFieldsProps): { [key: string]: unknown } => {
  const resultArgTypes: { [key: string]: unknown } = {};
  //this field can directly exclude by key
  excludingArray.forEach((v) => {
    resultArgTypes[v.trim()] = {
      table: {
        disable: true,
      },
    };
  });

  // console.log('hideArray', hideArrayFields);
  if (hideArrayFields && hideArrayFields?.length > 0) {
    Object.entries(flatObject as Record<string, string | boolean | number>).forEach(([flatKey]) => {
      if (hideArrayFields.some((excludeKey: string) => flatKey.includes(excludeKey))) {
        resultArgTypes[flatKey.trim()] = {
          table: {
            disable: true,
          },
        };
      }
    });
  }
  // console.log('resultArg Object:', resultArgTypes);
  return resultArgTypes;
};

export type RemoveArraySBFieldsProps = {
  categoryName?: string;
  subCategoryName?: string;
  fieldDetails: Array<{
    findString: string;
    name: string;
    description: string;
    control: { type: string; [key: string]: string | number | boolean };
    options?: unknown;
    table?: {
      category?: string;
      defaultValue?: { summary: string; detail?: string };
      disable?: boolean;
      subcategory?: string;
      type?: { summary?: string; detail?: string };
    };
    defaultValue?: string;
    if?: {
      arg?: string;
      eq?: any;
      exists?: boolean;
      neq?: any;
      truthy?: boolean;
    };
    type?: {
      [key: string]: boolean | string;
    };
  }>;
};

/**
 * @description use for array to create group
 */

export const groupArrayItems = (
  groupDetails: Array<RemoveArraySBFieldsProps>
): { [key: string]: unknown } => {
  const groupArgTypes: { [key: string]: unknown } = {};

  if (groupDetails && groupDetails.length > 0) {
    groupDetails.forEach((groupField) => {
      groupField.fieldDetails.forEach((fieldDetail) => {
        groupArgTypes[fieldDetail.findString.trim()] = {
          name: fieldDetail.name,
          description: fieldDetail.description,
          control: fieldDetail.control,
          options: fieldDetail.options,
          defaultValue: fieldDetail.defaultValue,
          table: {
            category: groupField.categoryName,
            subcategory: groupField.subCategoryName,
            ...fieldDetail.table,
          },
          type: fieldDetail.type,
        };
        // if (fieldDetail?.if) {
        //   groupArgTypes[fieldDetail.findString] = {
        //     ...(groupArgTypes[fieldDetail.findString] as Record<string, any>),
        //     if: {
        //       ...fieldDetail.if,
        //       arg: fieldDetail.if.arg,
        //     },
        //   };
        // }
      });
    });
  }
  // console.log('groupArgTypes: ', groupArgTypes);
  return groupArgTypes;
};
