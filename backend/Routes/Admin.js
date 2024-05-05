import { Router } from "express";
const router = Router();
import { library, user, books, requestEvents, issueRegistry } from "../db.js";

function adminMiddleware (req,res,next){

    const role = req.headers.role
    
    if(role != 'admin'){
        console.log(role)
        res.status(403).json({
            msg:  "You are not authorised for admin Role "
        })      
        
    }else{
        next(); 
    }
    
};

// Admin Routes

// add a new book
router.post('/books', adminMiddleware,async (req, res) => {
    try{
        const { LibId, Title , Authors, Publisher, Version, TotalCopies, AvailableCopies } = req.body;
       

        const newBook= await books.create({
            LibId, Title , Authors,
            Publisher,
            Version,
            TotalCopies,
            AvailableCopies 
        })

        res.json({
            msg: "Book added successfully"
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            msg: " error " 
        })

    }
    
});

// Remove Book
router.delete('/books/remove/:isbn', adminMiddleware, async (req, res) => {
    try {
        const { isbn } = req.params; // No need to access req.params.isbn again
        console.log(isbn);
        const removedBook = await books.findOneAndDelete({ _id: isbn });
        if (removedBook) {
            res.json({ message: 'Book removed successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


// Update the details of Books
router.put('/books/update/:isbn', adminMiddleware, async (req, res) => {
    try {
        const { isbn } = req.params;
        console.log(isbn);
        await books.findOneAndUpdate({ _id: isbn }, req.body);
        res.status(200).json({ message: 'Book details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// List Issue Requests
router.get('/issue-requests',adminMiddleware, async (req, res) => {
    try {
        const issueRequests = await requestEvents.find();
        res.json(issueRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Approve or Reject Request based on Book Availability
router.put('/issue-requests/:reqId', async (req, res) => {
    try {
        const{ reqId  }= req.params;
        const approverID  = req.body.approverID;

        // Find the request
        const request = await requestEvents.findOne({ _id: reqId });

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Check if the request is for issuing a book
        if (request.RequestType != 'Issue') {
            return res.status(400).json({ message: 'This route is only for approving/rejecting issue requests' });
        }

        // Find the book
        const book = await books.findOne({ _id: request.BookId });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if there are available copies of the book
        if (book.AvailableCopies <= 0) {
            return res.status(400).json({ message: 'No available copies of the requested book' });
        }

        // If there are available copies, approve the request
        const updateRequest = {
            ApprovalDate: new Date(),
            ApproverID: approverID,
            RequestType:"approved"
           
        };
        await requestEvents.findOneAndUpdate({ _id: reqId }, updateRequest);

        // Update Issue Registry
        const newIssue = new issueRegistry({
            
            
            ReaderID: request.ReaderId,
            IssueApproverID: approverID,
            IssueStatus: 'approved',
            IssueDate: new Date(),
            ExpectedReturnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Assuming 14 days return period
        });
        await newIssue.save();

        // Decrease available copies of the book
        await books.findOneAndUpdate({ _id: request.BookId }, { $inc: { AvailableCopies: -1 } });

        res.status(200).json({ message: 'Request approved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Issue Info for a Reader
router.get('/issue-info/:readerId', adminMiddleware,async (req, res) => {
    try {
        const { readerId } = req.params;
        const issueInfo = await issueRegistry.find({ ReaderID: readerId });
        res.json(issueInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server


export default router;