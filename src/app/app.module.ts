import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopSliderComponent } from './top-slider/top-slider.component';
import { DrivingCourseFormComponent } from './driving-course-form/driving-course-form.component';
import { FeaturesComponent } from './features/features.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { StartLearningBannerComponent } from './start-learning-banner/start-learning-banner.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TeamComponent } from './team/team.component';
import { PricingComponent } from './pricing/pricing.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { NewsComponent } from './news/news.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { FunfactComponent } from './funfact/funfact.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopSliderComponent,
    DrivingCourseFormComponent,
    FeaturesComponent,
    AboutusComponent,
    CoursesComponent,
    StartLearningBannerComponent,
    GalleryComponent,
    TeamComponent,
    PricingComponent,
    TestimonialComponent,
    NewsComponent,
    OurClientsComponent,
    FunfactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
