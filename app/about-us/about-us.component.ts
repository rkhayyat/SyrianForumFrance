import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {FirebaseService} from '../services';
import {Router} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Location} from "@angular/common";
var appversion = require("nativescript-appversion");
var utilityModule = require("utils/utils");

@Component({
  moduleId: module.id,
  selector: 'gf-about-us',
  templateUrl: 'about-us.html'
})
export class AboutUsComponent implements OnInit{
  textHtml1: string;
  textHtml2: string;
  selectedIndex:number;
  constructor(private router: Router, 
              private firebaseService: FirebaseService,
              private routerExtensions:RouterExtensions,
              private location:Location) {

                this.selectedIndex =1;

 }

ngOnInit(){
  this.textHtml1 = `<b>من نحن:</b> <br><br>
مبادرة إيد وحدة عبارة عن مبادرة تطوعية إجتماعية تشاركية قائمة على تراكم وتبادل الخبرات والمعلومات وتضامن السوريين والعرب فيما بينهم.<br><br>
مشروع مبادرة إيد وحدة قائم على عدة مراحل، المرحلة الأولى كانت بالتعاون والاستفادة من مجموعة منتدى السوريين في فرنسا على الفيسبوك،
  منذ عام 2014 أُنشئت مجموعة منتدى السوريين في فرنسا على الفيسبوك لتكون الصفحة التي تجمع السوريين بشكل خاص والعرب بشكل عام المتواجدين على الأراضي
  الفرنسية.<br><br>
  كان الهدف الأساسي لهذه المجموعة ومازال تبادل التجارب والخبرات بين السوريين فيما بينهم والعرب وخاصة في مجال الدراسة والعمل والأمور الإدارية <br><br>
  وبعد مضي أكثر من ثلاث سنوات على إنشاء المجموعة وتوافر عدد كبير من المشاركات من تجارب الأعضاء وحتى لا تضيع هذه المشاركات قررنا نحن في مباردة إيد وحدة جمع هذه المقالات والعمل على تنقيح بعضها وتزويدها بمحرك بحث لتصبح بمتناول الجميع بسهولة ويسر
  <br><br>
  المرحلة الثانية من مباردة إيد وحدة كانت بإضافة أدوات تساعد العاطلين عن العمل على حساب قيمة المساعدات المقدمة من الحكومة الفرنسية بحسب حالة كل عائلة وعدد أفرادها. وما زال العمل قائم على هذه المرحلة لإضافة المزيد من الأدوات.
  <br><br>
  بالتوازي مع المرحلة الثانية بدأت المرحلة الثالثة وبالتعاون مع متطوعين آخرين هم
  <br>
 
 - Baptiste Pelletan<br> 
 - Panthea Bahiraie<br> 
 - Dalia Frantz<br> 
 - Marine Rainjonneau<br> 
 - c Manco<br>
 - Lola Ripoche<br>
 - Zeineb Bakhtaoui<br>

قام هؤلاء المتطوعون بجمع كتيب يحوي مجموعة تقارب الألف ومئتين مفردة وعبارة تعتبر الأكثر شيوعاً ومترجمه لعدة لغات من بينها الفرنسية والإنكليزية والعربية والكردية وغيرها. قامت مبادرة إيد وحدة بنسخ هذا الكتيب وضمه لقاعدة بيانات تطبيقه ليتم بعدها استخدامهم بشكل مجموعات فلاش كارد ليتسنى للمستخدم حفظهم وليمكنه التطبيق من الاستمتاع للفظ الكلمة كما وليتيح له أيضا قراءة الكلمة وتصحيح لفظ المستخدم.
  <br>
  العمل مازال مستمر والتطبيق سيترافقه مراحل وميزات أخرى لتساعد المهاجرين في غربتهم.
  `
    this.textHtml2 = "<b> رقم النسخة ";
    appversion.getVersionName().then((v: string) =>{
        this.textHtml2 += v + " </b>";
    });
}
followUs(){
      var installed = utilityModule.openUrl("fb://page/303192086777956");
          if (!installed) {
          utilityModule.openUrl("https://facebook.com/EidWa7deh/");
      }
}
back(){
  this.location.back();
}
logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/login"], { clearHistory: true } );
  }

}
