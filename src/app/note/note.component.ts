import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  noteForm!: FormGroup;
  editForm!: FormGroup;
  noteDetails:any;
  notesData:any = []

  noteObj: Note ={
    id: '',
    note_title: '',
    note_des: ''
  }

  constructor(private fb:FormBuilder, private noteService:NoteService) { 
    this.noteForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required]
    });
    this.editForm = this.fb.group({
      edit_title:['',Validators.required],
      edit_description:['',Validators.required]
    })
  }

  ngOnInit() {
    this.getAllNotes()
  }
  addNote(){
    const { value } = this.noteForm
    console.log(value);
    this.noteObj.id='',
    this.noteObj.note_title=value.title,
    this.noteObj.note_des=value.description

    this.noteService.addNote(this.noteObj).then((note)=>{
      if(note){
        alert("Note Added Successfully");
        this.noteForm.reset();
      }
    })

  }

  //get all
  getAllNotes(){
    this.noteService.getNotes().subscribe((res:Note[])=>{
      console.log(res)
      this.notesData = res;
    })
  }

  //delete notes
  deleteNote(note:Note){
    let decision = confirm("Are you sure want to delete this note?");
    if(decision == true){
      this.noteService.deleteNote(note);
    }
  }
  
  getAllDetails(note:Note){
  this.noteDetails = note
  console.log(this.noteDetails)
  }

  //update notes
  updateNote(note: Note) {
    const { value } = this.editForm
    console.log(value);

    this.noteObj.id=note.id,
     this.noteObj.note_title=value.edit_title,
     this.noteObj.note_des=value.edit_description;

    this.noteService.updateNote(note, this.noteObj).then(()=>{
      alert("Note Updated Sucessfully")
    })
    this.editForm.reset()
  }
}
