import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
    private darkMode = new BehaviorSubject<boolean>(false);

    setDarkMode(isDark: boolean): void {
        this.darkMode.next(isDark);
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }

    getDarkMode(): BehaviorSubject<boolean> {
        return this.darkMode;
    }
}