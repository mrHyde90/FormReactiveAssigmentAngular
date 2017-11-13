import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	signupForm: FormGroup;
	invalidNames = ["Test"];

	ngOnInit() {
		this.signupForm = new FormGroup({
			'projectName': new FormControl(null, [Validators.required], this.forbiddenProjectNames),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'projectStatus': new FormControl('Critical')
		});
	}

	onSubmit() {
		console.log(this.signupForm);
	}

	forbiddenNames(control: FormControl): {[s: string]: boolean}{
  	if(this.invalidNames.indexOf(control.value) !== -1){
  		return {'nameIsForbidden': true};
  	}
  	return null;
  }

  	forbiddenProjectNames(control: FormControl): Promise<any> | Observable<any>{
    	const promise = new Promise<any>((resolve, reject)=>{
      	setTimeout(() => {
        	if(control.value === 'Test') {
          	resolve({'nameIsForbidden': true});
        	} else {
          	resolve(null);
        	}
      	}, 1500);
    	});
    	return promise;
  	}

}
