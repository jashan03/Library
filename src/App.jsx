

import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'

import { RemoveBook } from './forms/removeBook'
import { UpdateBook} from './forms/updateBook.jsx'
import { ListIssue } from './forms/listIssue'
import { ApproveOrReject } from './forms/approveOrReject'
import { ReaderInfo } from './forms/readerInfo'
import { Signup } from './forms/signup'
import {IssueReq} from './forms/issueReq'


import { AddBook } from './forms/addBook'
import { Search } from './forms/search'







function App() {
  return (
    <div>
     
    <BrowserRouter>
    <Routes>
      <Route path="/admin/books" element={<AddBook/>} ></Route>
      <Route path="admin/books/remove/:isbn" element={<RemoveBook/>} ></Route>
      <Route path="admin/books/update/:isbn" element={<UpdateBook/>} ></Route>
      <Route path="admin/issue-requests" element={<ListIssue/>} ></Route>
      <Route path="admin/issue-requests/:reqId" element={<ApproveOrReject/>} ></Route>
      <Route path="admin/issue-info/:readerId" element={<ReaderInfo/>} ></Route>
      {/* user paths */}
      <Route path="user/reader/signup" element={<Signup/>} ></Route>
      <Route path="user/reader/issue-request" element={<IssueReq/>} ></Route>
      <Route path="user/reader/search" element={<Search/>} ></Route>
      
    </Routes>
    </BrowserRouter>
    </div>
  )

}



export default App
