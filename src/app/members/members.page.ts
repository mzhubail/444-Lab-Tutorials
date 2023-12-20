import { Component, OnInit, ViewChild } from '@angular/core';
import { Member, MembersService } from '../services/members.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  // Edit functionality
  editIndex = -1;
  editForm;
  editMemberGender: 'm' | 'f' = 'm';
  editMemberEmail: string = '';

  constructor(
    public membersService: MembersService,
    public formBuilder: FormBuilder,
  ) {
    membersService.members$.subscribe(data => {
      this.members = data;
    });
    this.loginForm = this.buildAddForm('', '', '', '', '', '', '',);
    this.editForm = this.buildEditForm('', '', '', '', '', '',);
  }

  buildAddForm(
    sid: string,
    fName: string,
    lName: string,
    email: string,
    age: string,
    major: string,
    phone: string,
  ) {
    return this.formBuilder.group({
      sid: [sid, [Validators.required, NumberValidator.number,]],
      fName: [fName, [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      lName: [lName, [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      email: [email, [Validators.required, Validators.email, Validators.maxLength(64), Validators.minLength(8),]],
      age: [age, [Validators.required, NumberValidator.number, Validators.min(18), Validators.max(99),]],
      major: [major, [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      phone: [phone, [Validators.required, Validators.pattern(/^(66|3\d)\d{6}$/)]],
    });
  }

  buildEditForm(
    sid: string,
    fName: string,
    lName: string,
    age: string,
    major: string,
    phone: string,
  ) {
    return this.formBuilder.group({
      sid: [sid, [Validators.required, NumberValidator.number,]],
      fName: [fName, [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      lName: [lName, [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      age: [age, [Validators.required, NumberValidator.number, Validators.min(18), Validators.max(99),]],
      major: [major, [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      phone: [phone, [Validators.required, Validators.pattern(/^(66|3\d)\d{6}$/)]],
    });
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

  // Edit functionality
  toggleEditable(index: number, id: string | undefined) {
    if (this.editIndex == index) {
      if (this.editForm.invalid)
        return;

      this.editIndex = -1;
      if (this.members === undefined || id === undefined)
        return;
      if (this.editForm.touched || this.editMemberGender !== this.members[index].gender) {
        const _member = {
          gender: this.editMemberGender,
          email: this.editMemberEmail,
          ...this.editForm.value,
        };
        const member = (_member as unknown) as Member;
        this.membersService.setMember(id, member);
      }

    } else {
      this.editIndex = index;
      if (!this.members)
        return;
      const member = this.members[index];
      this.editMemberEmail = member.email;
      this.editForm = this.buildEditForm(
        member.sid.toString(),
        member.fName,
        member.lName,
        member.age.toString(),
        member.major,
        member.phone.toString(),
      );
    }
  }

  _delete(id: string | undefined) {
    if (id)
      this.membersService.deleteMember(id);
  }
}
