/* eslint-disable @typescript-eslint/no-explicit-any */
/* =================================================================================================
                                                Example1
                                            (Generic Type)
====================================================================================================
*/

type OldGenericType = {
  data: any;
};

type GenericType<TData> = {
  data: TData;
};

type GenericType1 = GenericType<{ firstName: string; lastName: string }>;
type GenericType2 = GenericType<string>;
type GenericType3 = GenericType<number>;

const genericType1: GenericType1 = {
  data: {
    firstName: 'John',
    lastName: 'Doe',
  },
};

const genericType2: GenericType2 = {
  data: 'Hello World',
};

const genericType3: GenericType3 = {
  data: 123,
};

/* =================================================================================================
                                                STEPs
1. Create a generic type that accepts a generic argument.
2. Extend the needed type from the generic type but passing the required type as an argument.
====================================================================================================
*/

/* =================================================================================================
                                                Example2
                                            (Generic Function)
====================================================================================================
*/

const oldMakeFetch = (url: string): any => fetch(url).then((res) => res.json());

oldMakeFetch('https://jsonplaceholder.typicode.com/users').then(
  (data: { firstName: string }) => {
    console.log(data);
  },
);

const genericMakeFetch = <TData>(url: string): Promise<TData> =>
  fetch(url).then((res) => res.json());

genericMakeFetch<{ firstName: string }>(
  'https://jsonplaceholder.typicode.com/users',
).then((data) => {
  console.log(data);
});

/* =================================================================================================
                                                STEPs
1. Instead of getting any as a response from the fetch function, we can use a generic type.
2. We can pass the type argument which is the type of the expected returned data <TData>
    which is the type of the expected returned data,
3. And pass the runtime argument which is the string url.
4. Adding that we we will return the Promise<TData> as the it is the expected
    return type of the function.
====================================================================================================
*/
