import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  pl: {
    translation: {
      //overview
      overview: "Przegląd",
      //elevation
      elevation: "Elewacja",
      elevationClosedShort: "Zał.",
      elevationClosedLong: "Załączony",
      elevationOpenShort: "Wył.",
      elevationOpenLong: "Wyłączony",
      elevationTrippedShort: "Wyzw.",
      elevationTrippedLong: "Wyzwolony",
      //events
      events: "Zdarzenia",
      event: "Zdarzenie",
      eventsDevice: "Urządzenie",
      eventsTime: "Czas",
      eventsSearch: "Szukaj",
      eventsRows: "wierszy",
      eventsFrom: "z",
      eventsFirstPage: "Pierwsza strona",
      eventsLastPage: "Ostatnia strona",
      eventsNextPage: "Następna strona",
      eventsPreviousPage: "Poprzednia strona",
      eventsNoData: "Brak danych",
      //powermonitor
      powermonitor: "Strażnik mocy",
      powermonitorAlarmLabel: "Granica alarmu",
      powermonitorWarningLabel: "Granica ostrzeżenia",
      powermonitorStepsLabel: "Zużycie energii",
      powermonitorPredictedStepsLabel: "Przewidywane zużycie",
      powermonitorEnergyTrendYAxisLabel: "Zużycie energii [kWh]",
      powermonitorEnergyTrendXAxisLabel: "Czas",
      powermonitorBottomNavigationOverview: "Strażnik mocy",
      powermonitorBottomNavigationPowerTrend: "Moc 15-min",
      powermonitorBottomNavigationSettings: "Ustawienia",
      powermonitorDetailsCurrentInterval: "Aktualny okres 15-minutowy",
      powermonitorDetailsMeteredPower: "Zarejestrowane moce średnie",
      powermonitorDetailsMinute: "Minuta",
      powermonitorDetailsTotalPredictedPower: "Przewidywana moc ",
      powermonitorDetailsWarningLimit: "Próg ostrzeżenia ",
      powermonitorDetailsAlarmLimit: "Próg alamowy ",
      powermonitorSettingsTitle: "Ustawienia",
      powermonitorSettingsAlarmLimit: "Próg alamowy [kW]",
      powermonitorSettingsWarningLimit: "Próg ostrzeżenia [kW]",
      powermonitorSettingsTrafoLossesLimit:
        "Straty mocy na transformatorach [kW]",
      powermonitorSettingsActive: "Strażnik mocy włączony",
      powermonitorSettingsSendingEventsEnabled: "Wysyłanie zdarzeń włączone",
      powermonitorSettingsSendingEmailsEnabled: "Wysyłanie email włączone",
      powermonitorSettingsConfirmButton: "ZAPISZ",
      powermonitorSettingsResetButton: "RESETUJ",
      powermonitorSettingsEmailListTitle: "Lista mailowa",
      powermonitorSettingsAddRecipientButton: "DODAJ ADRES",
      powermonitorNewRecipientDialogTitle: "Dodaj nowy adres",
      powermonitorNewRecipientDialogLabel: "Adres email",
      powermonitorNewRecipientDialogAddButton: "DODAJ ADRES",
      powermonitorNewRecipientDialogCancelButton: "ANULUJ",
      powermonitorPower15TrendTitle:
        "Przebieg średnich wartości mocy czynnej 15-min",
      powermonitorPower15TrendYAxis: "Średnia moc czynna [kW]",
      powermonitorPower15AlarmLineLabel: "Próg alarmowy [kW]",
      powermonitorPower15WarningLineLabel: "Próg ostrzeżenia [kW]",
      powermonitorPower15ValidPointsLabel: "Moc czynna 15-min [kW]",
      powermonitorPower15WarningPointsLabel:
        "Moc czynna 15-min [kW] - ostrzezenie",
      powermonitorPower15AlarmPointsLabel: "Moc czynna 15-min [kW] - alarm",
      powermonitorPower15MonthLabel: "Miesiąc",
      powermonitorPower15YearLabel: "Rok",
      powermonitorPower15MaxValueLabel: "Wartość maksymalna",

      powermonitorPower15TableTitle: "Przekroczenia mocy",
      powermonitorPower15TableDateColumn: "Data i czas",
      powermonitorPower15TableValueColumn: "Moc [kW]",
      powermonitorPower15TableTransgressionColumn: "Przekroczenie [kW]",
      powermonitorPower15TableSeverityColumn: "Alarm/ostrzeżenie",
      powermonitorPower15TablePaginationFrom: "z",
      powermonitorPower15TablePaginationRows: "wierszy",
      powermonitorPower15TablePaginationPreviousPage: "Poprzednia strona",
      powermonitorPower15TablePaginationNextPage: "Następna strona",
      powermonitorPower15TablePaginationFirstPage: "Pierwsza strona",
      powermonitorPower15TablePaginationLastPage: "Ostatnia strona",
      powermonitorPower15TableExportTitle: "Eksportuj",
      powermonitorPower15TableExportAriaLabel: "Eksportuj",
      powermonitorPower15TableExportName: "Eksportuj do CSV",
      powermonitorPower15TableDataEmpty: "Brak danych",
      powermonitorPower15TableSeverityAlert: "Alarm",
      powermonitorPower15TableSeverityWarning: "Ostrzeżenie",
      powermonitorNotReadyLabel:
        "Strażnik mocy nie jest gotowy! Zaczekaj do zakończenia aktualnego okresu 15-minutowego",

      //reports
      reports: "Raporty",
      reportsMenuEnergyReport: "Zużycie energii",
      reportsMenu15MinPowerReport: "Moce 15-minutowe",
      reportsMenuQualityReport: "Jakość zasilania",

      reportsEnergyReportDateTimePickerTitle: "Wybierz miesiąc",
      reportsEnergyReportGroupConsumptionTitle:
        "Miesięczne zużycie energii czynnej",

      reportsEnergyReportGroupName_building01: "Budynek 01",
      reportsEnergyReportGroupName_building1: "Budynek 1",
      reportsEnergyReportGroupName_building2: "Budynek 2",
      reportsEnergyReportGroupName_building3: "Budynek 3",
      reportsEnergyReportGroupName_parking: "Parking",
      reportsEnergyReportGroupName_rest: "Pozostałe",
      reportsEnergyReportGroupName_total: "Łącznie",
      reportsEnergyReportGroupName_transformers: "Transformatory",

      reportsEnergyReportTableInfeedColumnHeader: "Nazwa odbioru",
      reportsEnergyReportTableInfeedColumnActiveEnergyConsumption:
        "Zużycie energii czynnej",

      reportsEnergyReportDailyConsumptionTitle:
        "Dzienne zużycie energii czynnej",

      reportsEnergyReportTableDateColumn: "Dzień miesiąca",
      reportsEnergyReportTablePaginationFrom: "z",
      reportsEnergyReportTablePaginationRows: "wierszy",
      reportsEnergyReportTablePaginationPreviousPage: "Poprzednia strona",
      reportsEnergyReportTablePaginationNextPage: "Następna strona",
      reportsEnergyReportTablePaginationFirstPage: "Pierwsza strona",
      reportsEnergyReportTablePaginationLastPage: "Ostatnia strona",
      reportsEnergyReportTableExportTitle: "Eksport",
      reportsEnergyReportTableExportAriaLabel: "Eksport",
      reportsEnergyReportTableExportName: "Eksportuj do CSV",
      reportsEnergyReportTableDataEmpty: "Brak danych",

      reportsReactiveEnergyImportReportGroupConsumptionTitle:
        "Dzienne zużycie energii biernej indukcyjnej",

      reportsReactiveEnergyExportReportGroupConsumptionTitle:
        "Dzienne zużycie energii biernej pojemnościowej",

      //slideUpDialog
      slideUpDialogTabOverview: "Przegląd",
      slideUpDialogTabVoltage: "Napięcie",
      slideUpDialogTabCurrent: "Prąd",
      slideUpDialogTabPower: "Moc",
      slideUpDialogBreakerStateTitle: "Stan wyłącznika",
      slideUpDialogGeneratorStateTitle: "Stan generatora",
      slideUpDialogGeneratorStateReady: "Gotowy",
      slideUpDialogGeneratorStateNotReady: "Nie gotowy",
      slideUpDialogBreakerStateClosed: "Załączony",
      slideUpDialogBreakerStateOpen: "Wyłączony",
      slideUpDialogLastTripTitle: "Ostatnie wyzwolenie",
      slideUpDialogLastTripReason0: "Brak operacji wyzwolenia lub ostatnie wyzwolenie potwierdzone",
      slideUpDialogLastTripReason1: "Wyzwolenie przeciążeniowe (L)",
      slideUpDialogLastTripReason2: "Wyzwolenie bezzwłoczne zwarciowe (I)",
      slideUpDialogLastTripReason3: "Wyzwolenie krótkozwłoczne zwarciowe (sd)",
      slideUpDialogLastTripReason4: "Zwarcie doziemne",
      slideUpDialogLastTripReason5: "Wyzwolenie na skutek rozszerzonej funkcji ochronnej",
      slideUpDialogLastTripReason6: "Przeciążenie przewodu neutralnego (N)",
      slideUpDialogLastTripReason7: "Reserved",
      slideUpDialogActivePower: "Moc czynna",
      slideUpDialogReactivePower: "Moc bierna",
      slideUpDialogApparentPower: "Moc pozorna",
      slideUpDialogCosTotal: "Cos Total",
      slideUpDialogTitlebarBreaker: "Wyłącznik",
      slideUpDialogTooltipShowCurrentChart: "Pokaż wykres prądów",
      slideUpDialogTooltipShowPowerChart: "Pokaż wykres mocy",
      slideUpDialogTooltipShowVoltageLLChart: "Pokaż wykres napięcia L-L",
      slideUpDialogTooltipShowVoltageLNChart: "Pokaż wykres napięcia L-N",
      slideUpDialogTooltipShowTHDUChart: "Pokaż wykres THD V",
      slideUpDialogTooltipShowTHDIChart: "Pokaż wykres THD I",
      slideUpDialogTooltipBackToPreview: "Powrót",
      slideUpDialogTooltipRewindLeft: "Przewiń w lewo",
      slideUpDialogTooltipRewindRight: "Przewiń w prawo",
      slideUpDialogTooltipZoomIn: "Przybliż",
      slideUpDialogTooltipZoomOut: "Oddal",
      slideUpDialogCircuitSection: "Sekcja",
      slideUpDialogCircuitTransformer: "Transformator",
      slideUpDialogTabTHDI: "THD I",
      slideUpDialogTabTHDV: "THD U",
      //languageDialog
      languageDialogTitle: "Zmiana języka aplikacji",
      languageDialogText:
        "Aplikacja na podstawie różnych ustawień przeglądarki automatycznie dopasowuje język. Za pomocą przycisków można te ustawienia nadpisać.",
      languageDialogPolishLanguage: "Polski",
      languageDialogEnglishLanguage: "Angielski",
      //sidebar
      language: "Język",
      //chart labels and settings,
      chartYaxis: "Wartości",
      chartXaxis: "Czas",
      chartSettings: "Ustawienia",
      chartDataPickerTitle: "Data",
      chartRealtimeUpdate: "Odświeżanie na żywo",
      //chart variable names
      Voltage_L1_N: "Napięcie L1-N",
      Voltage_L2_N: "Napięcie L2-N",
      Voltage_L3_N: "Napięcie L3-N",
      Voltage_L1_L2: "Napięcie L1-L2",
      Voltage_L2_L3: "Napięcie L2-L3",
      Voltage_L3_L1: "Napięcie L3-L1",
      Current_L1: "Prąd L1",
      Current_L2: "Prąd L2",
      Current_L3: "Prąd L3",
      Total_active_power_import: "Moc czynna pobrana",
      Total_active_power_export: "Moc czynna oddana",
      Total_reactive_power_import: "Moc bierna indukcyjna",
      Total_reactive_power_export: "Moc bierna pojemnościowa",
      Total_apparent_power: "Moc pozorna",
      Active_power_import_15_min: "Moc czynna pobrana 15 min",
      Reactive_power_import_15_min: "Moc bierna indukcyjna 15 min",
      Active_power_export_15_min: "Moc czynna oddana 15 min",
      Reactive_power_export_15_min: "Moc bierna pojemnościowa 15 min",
      THD_voltage_L1: "THD U L1",
      THD_voltage_L2: "THD U L2",
      THD_voltage_L3: "THD U L3",
      THD_current_L1: "THD I L1",
      THD_current_L2: "THD I L2",
      THD_current_L3: "THD I L3",
      THD_Current_L1: "THD I L1",
      THD_Current_L2: "THD I L2",
      THD_Current_L3: "THD I L3",
      //connectionErrorNotification
      snackbarsConnectionError: "Błąd połączenia",
      //events
      eventSeverity: "Ważność",
      eventsTimeFrom: "Od",
      eventsTimeTo: "Do",
      //ATSE
      atseNotReady: "Nie gotowy",
      atseManual: "Ręczny",
      atseAuto: "Auto",
      atseAlarm: "Alarm",
      atseMode: "Tryb SZR:"
    }
  },
  en: {
    translation: {
      //overview
      overview: "Overview",
      //elevation
      elevation: "Elevation",
      elevationClosedShort: "Clsd.",
      elevationClosedLong: "Closed",
      elevationOpenShort: "Open",
      elevationOpenLong: "Open",
      elevationTrippedShort: "Trpd.",
      elevationTrippedLong: "Tripped",
      //powermonitor
      powermonitor: "Load monitoring",
      powermonitorAlarmLabel: "Alarm limit",
      powermonitorWarningLabel: "Warning limit",
      powermonitorStepsLabel: "Energy cunsumption",
      powermonitorPredictedStepsLabel: "Predicted consumption",
      powermonitorEnergyTrendYAxisLabel: "Energy consumption [kWh]",
      powermonitorEnergyTrendXAxisLabel: "Time",
      powermonitorBottomNavigationOverview: "Load monitoring",
      powermonitorBottomNavigationPowerTrend: "Power 15-min",
      powermonitorBottomNavigationSettings: "Settings",
      powermonitorDetailsCurrentInterval: "Current 15-minute interval",
      powermonitorDetailsMinute: "Minute",
      powermonitorDetailsMeteredPower: "Registered 15-minute powers",
      powermonitorDetailsTotalPredictedPower: "Predicted power",
      powermonitorDetailsWarningLimit: "Warning limit ",
      powermonitorDetailsAlarmLimit: "Alarm limit ",
      powermonitorSettingsTitle: "Settings",
      powermonitorSettingsAlarmLimit: "Alarm limit [kW]",
      powermonitorSettingsWarningLimit: "Warning limit [kW]",
      powermonitorSettingsTrafoLossesLimit: "Transformers power loss [kW]",
      powermonitorSettingsActive: "Load monitoring enabled",
      powermonitorSettingsSendingEventsEnabled: "Sending events enabled",
      powermonitorSettingsSendingEmailsEnabled: "Sending emails enabled",
      powermonitorSettingsConfirmButton: "CONFIRM",
      powermonitorSettingsResetButton: "RESET",
      powermonitorSettingsEmailListTitle: "Mailing list",
      powermonitorSettingsAddRecipientButton: "ADD RECIPIENT",
      powermonitorNewRecipientDialogTitle: "Add new recipient",
      powermonitorNewRecipientDialogLabel: "Email adress",
      powermonitorNewRecipientDialogAddButton: "ADD RECIPIENT",
      powermonitorNewRecipientDialogCancelButton: "CANCEL",
      powermonitorPower15TrendTitle: "Average active power 15-min",
      powermonitorPower15TrendYAxis: "Average active power [kW]",
      powermonitorPower15AlarmLineLabel: "Alert limit [kW]",
      powermonitorPower15WarningLineLabel: "Warning limit [kW]",
      powermonitorPower15ValidPointsLabel: "Active power 15-min [kW]",
      powermonitorPower15WarningPointsLabel:
        "Active power 15-min [kW] - above warning",
      powermonitorPower15AlarmPointsLabel:
        "Active power 15-min [kW] - above alarm",
      powermonitorPower15MonthLabel: "Month",
      powermonitorPower15YearLabel: "Year",
      powermonitorPower15MaxValueLabel: "Maximum value",

      powermonitorPower15TableTitle: "Power transgressions",
      powermonitorPower15TableDateColumn: "Date and time",
      powermonitorPower15TableValueColumn: "Power [kW]",
      powermonitorPower15TableTransgressionColumn: "Transgression [kW]",
      powermonitorPower15TableSeverityColumn: "Alarm/warining",
      powermonitorPower15TablePaginationFrom: "of",
      powermonitorPower15TablePaginationRows: "rows",
      powermonitorPower15TablePaginationPreviousPage: "Previous page",
      powermonitorPower15TablePaginationNextPage: "Next page",
      powermonitorPower15TablePaginationFirstPage: "First page",
      powermonitorPower15TablePaginationLastPage: "Last page",
      powermonitorPower15TableExportTitle: "Export",
      powermonitorPower15TableExportAriaLabel: "Export",
      powermonitorPower15TableExportName: "Export as CSV",
      powermonitorPower15TableDataEmpty: "No data",
      powermonitorPower15TableSeverityAlert: "Alarm",
      powermonitorPower15TableSeverityWarning: "Warninig",

      powermonitorNotReadyLabel:
        "Load monitoring is not ready! Wait for the next 15-minute interval...",

      //reports
      reports: "Reports",
      reportsMenuEnergyReport: "Energy consumption",
      reportsMenu15MinPowerReport: "Power demand",
      reportsMenuQualityReport: "Supply quality",

      reportsEnergyReportDateTimePickerTitle: "Choose month",
      reportsEnergyReportGroupConsumptionTitle:
        "Monthly active energy consumption",
      reportsEnergyReportGroupName_building01: "Building 01",
      reportsEnergyReportGroupName_building1: "Building 1",
      reportsEnergyReportGroupName_building2: "Building 2",
      reportsEnergyReportGroupName_building3: "Building 3",
      reportsEnergyReportGroupName_parking: "Parking",
      reportsEnergyReportGroupName_rest: "Rest",
      reportsEnergyReportGroupName_total: "Total",
      reportsEnergyReportGroupName_transformers: "Transformers",

      reportsEnergyReportTableInfeedColumnHeader: "Infeed name",
      reportsEnergyReportTableInfeedColumnActiveEnergyConsumption:
        "Active energy consumption",

      reportsEnergyReportTableDateColumn: "Day in month",
      reportsEnergyReportTablePaginationFrom: "of",
      reportsEnergyReportTablePaginationRows: "rows",
      reportsEnergyReportTablePaginationPreviousPage: "Previous page",
      reportsEnergyReportTablePaginationNextPage: "Next page",
      reportsEnergyReportTablePaginationFirstPage: "First page",
      reportsEnergyReportTablePaginationLastPage: "Last page",
      reportsEnergyReportTableExportTitle: "Export",
      reportsEnergyReportTableExportAriaLabel: "Export",
      reportsEnergyReportTableExportName: "Export as CSV",
      reportsEnergyReportTableDataEmpty: "No data",

      reportsEnergyReportDailyConsumptionTitle:
        "Daily active energy consumption",

      reportsReactiveEnergyImportReportGroupConsumptionTitle:
        "Daily reactive energy import consumption",

      reportsReactiveEnergyExportReportGroupConsumptionTitle:
        "Daily reactive energy export consumption",

      //events
      events: "Events",
      event: "Event",
      eventsDevice: "Device",
      eventsTime: "Time",
      eventsSearch: "Search",
      eventsRows: "Rows",
      eventsFrom: "from",
      eventsFirstPage: "First page",
      eventsLastPage: "Last page",
      eventsNextPage: "Next page",
      eventsPreviousPage: "Previous page",
      eventsNoData: "No data",
      //slideUpDialog
      slideUpDialogTabOverview: "Overview",
      slideUpDialogTabVoltage: "Voltage",
      slideUpDialogTHDI: "THD I",
      slideUpDialogTHDV: "THD U",
      slideUpDialogTabCurrent: "Current",
      slideUpDialogTabPower: "Power",
      slideUpDialogBreakerStateTitle: "Switching device state",
      slideUpDialogGeneratorStateTitle: "Generator state",
      slideUpDialogGeneratorStateReady: "Ready",
      slideUpDialogGeneratorStateNotReady: "Not ready",
      slideUpDialogBreakerStateClosed: "Closed",
      slideUpDialogBreakerStateOpen: "Open",
      slideUpDialogLastTripTitle: "Last trip",
      slideUpDialogLastTripReason0: "No tripping operation or last tripping operation acknowledged",
      slideUpDialogLastTripReason1: "Overload tripping (L)",
      slideUpDialogLastTripReason2: "Instantaneous short circuit (I)",
      slideUpDialogLastTripReason3: "Short-time delayed short circuit (sd)",
      slideUpDialogLastTripReason4: "Ground fault",
      slideUpDialogLastTripReason5: "Tripping operation as a result of extended protection function",
      slideUpDialogLastTripReason6: "Overload in neutral conductor (N)",
      slideUpDialogLastTripReason7: "Reserved",
      slideUpDialogActivePower: "Active power",
      slideUpDialogReactivePower: "Reactive power",
      slideUpDialogApparentPower: "Apparent power",
      slideUpDialogCosTotal: "Cos Total",
      slideUpDialogTitlebarBreaker: "Circuit breaker",
      slideUpDialogTooltipShowCurrentChart: "Show current chart",
      slideUpDialogTooltipShowPowerChart: "Show power chart",
      slideUpDialogTooltipShowVoltageLLChart: "Show Voltage L-L chart",
      slideUpDialogTooltipShowVoltageLNChart: "Show Voltage L-N chart",
      slideUpDialogTooltipShowTHDUChart: "Show THD V chart",
      slideUpDialogTooltipShowTHDIChart: "Show THD I chart",
      slideUpDialogTooltipBackToPreview: "Back",
      slideUpDialogTooltipRewindLeft: "Rewind left",
      slideUpDialogTooltipRewindRight: "Rewind right",
      slideUpDialogTooltipZoomIn: "Zoom in",
      slideUpDialogTooltipZoomOut: "Zoom out",
      slideUpDialogCircuitSection: "Section",
      slideUpDialogCircuitTransformer: "Transformer",
      slideUpDialogTabTHDI: "THD I",
      slideUpDialogTabTHDV: "THD U",
      //languageDialog
      languageDialogTitle: "Change application language",
      languageDialogText:
        "Based on various browser's settings, application automatically sets language. You can override this setting using buttons below.",
      languageDialogPolishLanguage: "Polish",
      languageDialogEnglishLanguage: "English",
      //sidebar
      language: "Language",
      //chart labels and settings,
      chartYaxis: "Values",
      chartXaxis: "Time",
      chartSettings: "Settings",
      chartDataPickerTitle: "Date",
      chartRealtimeUpdate: "Live updating",
      //chart variable names
      Voltage_L1_N: "Voltage L1-N",
      Voltage_L2_N: "Voltage L2-N",
      Voltage_L3_N: "Voltage L3-N",
      Voltage_L1_L2: "Voltage L1-L2",
      Voltage_L2_L3: "Voltage L2-L3",
      Voltage_L3_L1: "Voltage L3-L1",
      Current_L1: "Current L1",
      Current_L2: "Current L2",
      Current_L3: "Current L3",
      Total_active_power_import: "Total active power import",
      Total_active_power_export: "Total active power export",
      Total_reactive_power_import: "Total reactive power import",
      Total_reactive_power_export: "Total reactive power export",
      Total_apparent_power: "Total apparent power",
      Active_power_import_15_min: "Active power import 15 min",
      Reactive_power_import_15_min: "Reactive power import 15 min",
      Active_power_export_15_min: "Active power export 15 min",
      Reactive_power_export_15_min: "Reactive power export 15 min",
      THD_voltage_L1: "THD U L1",
      THD_voltage_L2: "THD U L2",
      THD_voltage_L3: "THD U L3",
      THD_current_L1: "THD I L1",
      THD_current_L2: "THD I L2",
      THD_current_L3: "THD I L3",
      THD_Current_L1: "THD I L1",
      THD_Current_L2: "THD I L2",
      THD_Current_L3: "THD I L3",
      //connectionErrorNotification
      snackbarsConnectionError: "Connection error",
      //events
      eventSeverity: "Severity",
      eventsTimeFrom: "From",
      eventsTimeTo: "To",
      //ATSE
      atseNotReady: "Not ready",
      atseManual: "Manual",
      atseAuto: "Auto",
      atseAlarm: "Alarm",
      atseMode: "ATSE Mode:"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      // order and from where user language should be detected
      order: [
        "navigator",
        "cookie",
        "querystring",
        "localStorage",
        "htmlTag",
        "path",
        "subdomain"
      ],

      // keys or params to lookup language from
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ["localStorage", "cookie"],
      excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

      // optional expire and domain for set cookie
      cookieMinutes: 10,
      cookieDomain: "myDomain",

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement
    },
    resources,
    fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
