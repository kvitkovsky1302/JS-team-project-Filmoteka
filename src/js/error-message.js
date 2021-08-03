import { error, defaults} from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

defaults.animateSpeed = 'fast';
defaults.delay = 2000;

export function showError() {
    error({
       title: "Oops.. Not found :(",
       text: "Search result not successful. Enter the correct movie name!",
    });
}