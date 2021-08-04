import { alert, error, info, notice, defaults, Stack } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
import 'material-design-icons/iconfont/material-icons.css';
defaults.styling = 'material';
defaults.icons = 'material';
defaults.width = 'auto';
defaults.delay = '4000';

export function showStackTopRight(type) {
    if (typeof window.showStackTopRight === 'undefined') {
      window.showStackTopRight = new Stack({
        dir1: 'down',
        dir2: 'left',
        firstpos1: 10,
        firstpos2: 10,
        push: 'top',
        maxStrategy: 'close'
      });
    }
    const opts = {
      stack: window.showStackTopRight
    };
    switch (type) {
      case 'error':
        opts.title = 'Oops.. Not found :(';
        opts.text = 'Enter the correct movie name!';
        opts.type = 'error';
        break;
      case 'info':
        opts.title = 'It is all!';
        opts.text = 'Found all films for your request!';
        opts.type = 'info';
        break;
      case 'success':
        opts.title = '';
        opts.text = '';
        opts.type = 'success';
        break;
    }
    notice(opts);
  }