import { Component, OnInit, ViewChild } from '@angular/core';
import { Member, MembersService } from '../services/members.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '../components/input-components';
import { NumberValidator } from '../custom-validators';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(FormComponent) membersForm!: FormComponent;
  addMemberGender: 'm' | 'f' = 'm';
  members: Member[] | undefined;
  loginForm;

  constructor(
    public membersService: MembersService,
    public formBuilder: FormBuilder,
  ) {
    membersService.members$.subscribe(data =>{
      this.members = data;
    });

    this.loginForm = formBuilder.group({
      sid: ['', [Validators.required, NumberValidator.number,]],
      fName: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      lName: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(64), Validators.minLength(8),]],
      age: ['', [Validators.required, NumberValidator.number, Validators.min(18), Validators.max(99),]],
      major: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(66|3\d)\d{6}$/)]],
    })
  }

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.membersForm.submitForm()
    if (this.loginForm.valid) {
      const _member = {
        gender: this.addMemberGender,
        ...this.loginForm.value,
      };
      const member = (_member as unknown) as Member;
      this.membersService.addMember(member);

      this.modal.dismiss(null, 'confirm');
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
