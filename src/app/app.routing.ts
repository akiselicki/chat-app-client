import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { ChatComponent } from './chat/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'chat', component: ChatComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
