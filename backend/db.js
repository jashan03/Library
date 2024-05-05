import { connect, Schema, model } from "mongoose";

//.env
connect("mongodb+srv://jashnkh:2Eq3To3jZERCiRGT@cluster0.yedusmp.mongodb.net/LIBRARY_MANAGE")
const librarySchema =  Schema({
    Name :String
   
})

const userSchema =  Schema({
    Name :String,   
    Email:String,
    ContactNumber:Number,
    Role:{
        type: String,
        enum: ['admin', 'reader'], // Only allow 'admin' or 'reader' as values
        default: 'reader' // Default value is 'reader'
    },
    LibId:String

   
})

const BookInventorySchema =  Schema({
    LibId:String,
    Title :String,  //type = string , required :true
    Authors:String,
    Publisher:String,
    Version:String,
    TotalCopies:Number,
    AvailableCopies:Number,

   
})

const RequestedEventsSchema =  Schema({
    //reques id same as -_id
   
    BookId :String,  //type = string , required :true
    ReaderId:String,
    RequestDate:Date,
    ApprovalDate:Date,
    ApproverID:String,
    RequestType:String  //?? for issue

})

const IssueRegistrySchema = Schema({
    IssueID: String,
    ReaderID: String,   
    IssueApproverID: String,
    IssueStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    IssueDate: {
        type: Date,
        default: Date.now
    },
    ExpectedReturnDate:Date,
    ReturnDate: Date,
    ReturnApproverID:String
        
});



const library= model('library',librarySchema) //table name, its schema
const user= model('user',userSchema) //table name, its schema
const books= model('books',BookInventorySchema) //table name, its schema
const requestEvents= model('RequestEvents',RequestedEventsSchema) //table name, its schema
const issueRegistry= model('IssueRegistry',IssueRegistrySchema) //table name, its schema


export {
    library,
    user,
    books,
    requestEvents,
    issueRegistry

}

