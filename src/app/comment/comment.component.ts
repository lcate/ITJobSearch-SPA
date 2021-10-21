import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllFunctions } from '../_Services/allFunctions';
import { CommentService } from '../_Services/CommentService';
import { JobApplicationService } from '../_Services/JobApplicationService';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentsComponent implements OnInit {
  user!: any;
  jobApplicationId!: number;
  jobApplication: any = [];
  comments!: any;
  response!: {dbPath: ''};
  message!: string;
  userEmail!: string;
  isCompanyUser!: boolean;
  public commentForm = this.formBuilder.group({
    commentMessage: ['', [Validators.required]]
  });

  constructor(private route: ActivatedRoute, private jobApplicationsService: JobApplicationService,
              private commentService: CommentService, private formBuilder: FormBuilder, private allFunction: AllFunctions)
                   { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobApplicationId = params.id;
    });
    this.user = this.allFunction.user;
    this.isCompanyUser = this.allFunction.isCompany;
    this.userEmail = this.allFunction.user.email;
    this.getJobApplicationById();
    this.getCommentsByJobApplicationId();
  }

  getJobApplicationById() {
    this.jobApplicationsService.getJobApplicationById(this.jobApplicationId)
      .subscribe((jobApplication) => {
        this.jobApplication = jobApplication;
      },
      err => {

      });
  }

  getCommentsByJobApplicationId() {
    this.commentService.getCommentsByJobApplicationId(this.jobApplicationId)
      .subscribe((comments) => {
        this.comments = comments;
      },
      err => {

      });
  }

  addComment() {
    this.commentService.addComment(this.jobApplicationId,
                                    this.userEmail,
                                    this.commentForm.controls.commentMessage.value,
                                    this.response ? this.response.dbPath : '')
      .subscribe(() => {
        this.commentForm.controls.commentMessage.setValue('');
        this.getCommentsByJobApplicationId();
        this.message = '';
        this.response.dbPath = '';
      },
      err => {

      });
  }

  updateStatusForJobApplication(status: number) {
    this.jobApplicationsService.updateStatusForJobApplication(status, this.jobApplicationId)
        .subscribe(() => {
          this.getJobApplicationById();
        },
        err => {

        });

  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `https://localhost:5001/${serverPath}`;
    } else {
      return 'https://loverary.files.wordpress.com/2013/10/facebook-default-no-profile-pic.jpg?w=778';
    }
  }

  public uploadFinished = (event: any) => {
    this.response = event;
  }

  public hiredClick() {
    this.updateStatusForJobApplication(1);
  }

  public declinedClick() {
    this.updateStatusForJobApplication(2);
  }

}
