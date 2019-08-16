import { combineReducers } from "redux";
import { drawerReducer } from "./drawerReducer";
import { chartReducer } from "./chartReducer";
import { switchesStateReducer } from "./switchesStateReducer";
import { dialogReducer } from "./dialogReducer";
import { languageDialogReducer } from "./languageDialogReducer";
import { powermonitorDataReducer } from "./powermonitorReducer";
import { busyDialogReducer } from "./busyDialogReducer";
import { newRecipientDialogReducer } from "./newRecipientDialogReducer";
import { reducer } from "redux-form";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
  drawerReducer,
  chartReducer,
  switchesStateReducer,
  dialogReducer,
  languageDialogReducer,
  powermonitor: powermonitorDataReducer,
  busyDialog: busyDialogReducer,
  newRecipientDialog: newRecipientDialogReducer,
  form: reducer,
  snackbar: snackbarReducer
});
