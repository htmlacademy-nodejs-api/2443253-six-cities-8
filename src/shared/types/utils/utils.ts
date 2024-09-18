export function convertToBoolean(input: string): boolean {
  try {
    return JSON.parse(input.toLowerCase());
  } catch (e) {
    console.log(`Error converting to boolean:${ e}`);
    return false;
  }
}
