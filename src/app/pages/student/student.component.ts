import { Component, OnInit, TemplateRef } from '@angular/core';
import { Student } from 'src/app/models/students/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [
    {id: 1, name: 'Diep', diemTB: 6},
    {id: 2, name: 'Pham', diemTB: 5},
    {id: 3, name: 'Con', diemTB: 7},
    {id: 4, name: 'Hay', diemTB: 8},
  ];
  student: Student;
  // keyword: string;
  // itemsAsync: Observable<any[]>;
   modalRef: BsModalRef;
  // page: number;
  // pageSize: number;
  // total: number;

  constructor(
    public studentService: StudentService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loadingBar: LoadingBarService,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    // this.keyword = '';
    // this.page = 1;
    // this.pageSize = 10;
    this.getAllStudents();
  }

  getAllStudents() {
    this.loadingBar.start();
    // this.itemsAsync = this.supplierService.getAllSuppliers(this.keyword, page, this.pageSize)
    //   .pipe(
    //     tap(response => {
    //       this.total = response.total;
    //       this.page = page;
    //       this.loadingBar.stop();
    //     }),
    //     map(response => response.items)
    //   );
    this.loadingBar.stop();

  }

  add() {
    this.router.navigate(['/students/add']);
  }

  edit(id: any) {
    this.router.navigate(['/students/edit/' + id]);
  }

  // editFull(id: any) {
  //     this.router.navigate(['/users/editfull/' + id]);
  // }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.student = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.student) {
      this.studentService.deleteStudent(this.student.id)
        .subscribe(
          () => {
            this.getAllStudents();
            this.toastr.success(`Xóa nhà sinh vien thành công`);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(('Xóa nhà cung cấp  không thành công'));
          }
        );
    }
    this.student = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.student = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllStudents();
  }

  refresh() {
    // this.keyword = '';
    this.getAllStudents();
  }

  export() {
    this.exportService.exportExcel(this.students, 'students');
  }

}
