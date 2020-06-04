import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentForAdd } from 'src/app/models/students/studentForAdd.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  addStudentForm: FormGroup;
  student: StudentForAdd;
  subjects: any[] = [
    {id: 1, name: 'Toan'},
    {id: 2, name: 'Ly'},
    {id: 3, name: 'Hoa'}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {
    this.addStudentForm = this.fb.group({
      name: ['', Validators.required],
      //scores: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  addStudent() {
    this.student = Object.assign({}, this.addStudentForm.value);
    this.studentService.createStudent(this.student).subscribe(
      () => {
        this.router.navigate(['/students']).then(() => {
          this.toastr.success('Thêm sinh vien thành công');
        });
      },
      (error: HttpErrorResponse) =>
        this.toastr.error('Thêm sinh vien không thành công!')
      );
  }

}
