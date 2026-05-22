import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'zfb59l35',
    dataset: 'production',
  },
  /**
   * Deployed at https://hotel-ambalakely.sanity.studio/
   * autoUpdates: true keeps the hosted Studio in sync when schemas change.
   * appId tells the CLI which deployment to update without prompting.
   */
  deployment: {
    autoUpdates: true,
    appId: 'o9e3fhwsjtukbprxxqyxsfqj',
  },
});
