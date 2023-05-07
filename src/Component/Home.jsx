import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Home() {

  const token = localStorage.getItem('token');
  const decodeToken = jwtDecode(token);

   let userID =  decodeToken._id;
   let citizenID = userID ;
  //  console.log(token);
  //  console.log(userID);

    const [UserNotes, setUserNotes] = useState([]);
    const [note, setNote] = useState({"title":"","desc":"",citizenID,token});
   


    async function getUserNotes(){
        const {data} = await axios.post(`https://sticky-note-fe.vercel.app/getUserNotes`,{ userID ,token:token});
        // console.log(data);
        if(data.message==="success"){
          setUserNotes(data.Notes);
        }
        //  console.log(UserNotes);
     }
     useEffect(() => {
      getUserNotes()
     }, [])

     function getNoteData({target}){
      setNote({...note,[target.name]:target.value});
     }
     //console.log(note);
    async function addNote(e){
      e.preventDefault();
     const {data}=  await axios.post(`https://sticky-note-fe.vercel.app/addNote`,note);
      //console.log(data);
      if(data.message==="success"){
          getUserNotes()
          document.getElementById("add-form").reset();
          }

     }

    async function deleteNote(NoteID){
      // const {data} = await axios.delete(`https://sticky-note-fe.vercel.app/deleteNote`,{data:{NoteID , token}});
      // //  console.log(data);
      // if(data.message==="deleted"){
      //   getUserNotes();
      // }
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`https://sticky-note-fe.vercel.app/deleteNote`,{data:{NoteID , token}}).then(
              (response)=>{
                if(response.data.message==="deleted"){
                  getUserNotes();
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )                  
                 }else{
                  // console.log(response);
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                  })
                 }
              }

          )

        }
      })
     }

     let NoteID
     const [EditNote, setEditNote] = useState({token,"title":"","desc":"",NoteID});
     function getNoteDataForEdit(_id,title,desc){
        //console.log([_id,title,desc]);
        
         setEditNote({token,"title":title,"desc":desc,NoteID:_id})
     }
     function editNoteData({target}){
        setEditNote({...EditNote ,[target.name]:target.value});
        console.log(EditNote);
     }
    async function updateNote(e){
      e.preventDefault();
      const {data}  = await axios.put(`https://sticky-note-fe.vercel.app/updateNote`,EditNote);
      // console.log(data);
      if(data.message==="updated"){
        getUserNotes();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your note has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
     }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-1 ms-auto my-3">
              {/* Button trigger Add Note modal */}
            <button
            type="button"
            className="btn btn-primary "
            data-bs-toggle="modal"
            data-bs-target="#addNoteModal"
            >
            add Note
          </button>
          </div>
        </div>
        
      </div>

      {/*add Modal */}
  <div
    className="modal fade"
    id="addNoteModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <form onSubmit={addNote} id='add-form'>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            add note
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <input onChange={getNoteData} type="text" name="title" id="" className='form-control my-2' placeholder='enter your note title' />
          <textarea onChange={getNoteData} name="desc" id="" cols="30" rows="10" placeholder='type your note' className='form-control'></textarea>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button  type="submit" className="btn btn-primary"  data-bs-dismiss="modal">
            add Note
          </button>
        </div>
        </form>

      </div>
    </div>
  </div>

{/*edit Modal */}
<div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <form onSubmit={updateNote}>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <input onChange={editNoteData} type="text" name="title" id="" className='form-control my-2' value={EditNote.title} placeholder='enter your note title' />
        <textarea onChange={editNoteData} name="desc" id="" cols="30" rows="10" value={EditNote.desc} placeholder='type your note' className='form-control'></textarea>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary"  data-bs-dismiss="modal">edit Note</button>
      </div>
      </form>
    </div>
  </div>
</div>


 <div className="container">
  <div className="row">
    {UserNotes.map((note)=>{
      return(
          <div key={note._id} className="col-md-4 my-3">
          <div className="note p-4 bg-warning">
            <h3 className='float-start'>{note.title}</h3>
            {/* Button trigger edit modal */}
            <button onClick={()=>{getNoteDataForEdit(note._id,note.title,note.desc)}} type="button" className="btn btn-primary float-end mx-1" data-bs-toggle="modal" data-bs-target="#editModal">
            <i className='fas fa-edit'></i> 
            </button>
            {/* Button delete */}
            <button onClick={()=>{deleteNote(note._id)}} type="button" className="btn btn-danger float-end" >
               <i className='fas fa-trash-alt'></i>
            </button>
            <div className='clearfix'></div>
            <p>{note.desc}</p>
          </div>
        </div>
    )  })
  }

  </div>
 </div>

    </>
  )
}
