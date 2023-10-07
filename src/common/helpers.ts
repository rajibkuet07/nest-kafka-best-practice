/**
 * Utility method for a delay
 * @param delay number - milliseconds to delay
 *
 * @returns Promise<unknown>
 */
export const sleep = async (delay: number) =>
  await new Promise((resolve) => setTimeout(resolve, delay));
