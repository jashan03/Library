import { Router } from "express";
const router = Router();
import { library, user, books, requestEvents, issueRegistry } from "../db.js";


const UserMiddleware = async (req, res, next) => {
    try {
        const  Email  = req.body.email;
        const response = await user.findOne({ Email: Email });
        
        if (!response) {
            return res.status(403).json({
                msg: "User not found"
            });
        }
        
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Routes


//reader/signup - ROUTE
router.post('/reader/signup', async (req, res) => {
    // Implement admin signup logic

    // given user is signing up for the first time
    try{
        const { Name, Email , ContactNumber, LibId, Role  } = req.body;


    // check if a user already exists - not done
    await user.create({
        Name, Email , ContactNumber, LibId, Role,
    })
    res.json({
            msg: " signed up successfully"
        })
    }catch(error){
        console.log(error)
       res.status(403).json({
        msg:"oops!"
       })
    }  

   // URLSearchParams.create()
});

// Raise an issue request for a book
router.post('/reader/issue-request',async (req, res) => {
    try {
        const  BookId = req.body.BookId;
        const ReaderId  = req.body.ReaderId;

        
        // Check if the book exists
        const book = await books.findOne({ _id: BookId });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if there are available copies of the book
        if (book.AvailableCopies <= 0) {
            return res.status(400).json({ message: 'No available copies of the requested book' });
        }

        // Create a new issue request
        const newRequest = new requestEvents({
            BookId:BookId,
            ReaderId:ReaderId,
            RequestDate: new Date(),
            RequestType: 'Issue',
            ApprovalDate:"",
            ApproverID:"null"
        });
        await newRequest.save();

        res.status(201).json({ message: 'Issue request raised successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

// Search book by Title, Author, Publisher
router.get('/reader/search',async (req, res) => {
    try {
        const { title, author, publisher } = req.query;
        
        // Build the query
        const query = {};
        if (title) query.Title = { $regex: title, $options: 'i' }; // Case-insensitive search
        if (author) query.Authors = { $regex: author, $options: 'i' };
        if (publisher) query.Publisher = { $regex: publisher, $options: 'i' };

        const book = await books.find(query);
        res.json(book);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});



export default router;