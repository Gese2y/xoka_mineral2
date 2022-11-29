// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootPath: window["rootPath" as any],
  formPath: window["formPath" as any],
  rootPath2: window["rootPath2" as any],
  //formPathPrimary: window["formPathPrimary" as any],
  rootLookupApiPath: window["rootLookupApiPath" as any],
  formPathPrimary: window["formPath_primary " as any],
  rootApiPath: window["rootApiPath" as any],

  // formPath: '',
  // username: 'BL_desk_mgr',
  username: "applicant",
  // username: 'BL_Data_Encoder',
  // username: 'BL_Tech_leader',
  // username: 'berukbb',
  // username: 'fruit',
  // username: 'Boss',
  phisicalPath: "./assets/i18n/",
  localGisServer: window['local_GIS_server'],
  wfsGeoServer: window['wfs_geoserver'],
  Lang: "10D04E8B-3361-E111-95D5-00E04C05559B",
  certReportPath: window["certReportPath"],
  LetterReportPath: window["LetterReportPath"],
  PaymentReportPath: window["PaymentReportPath"],
  ValidateReportPath: window["ValidateReportPath"],
  GISURL: window["GISURL"],
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
