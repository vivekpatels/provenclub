const { connectDB } = require("../config/db");
const Books = require("../models/Books");
const BookModel = require("../models/Books");
const Circulation = require("../models/Circulation");
const Members = require("../models/Members");
const moment = require('moment')

const getAllBooks = async (req, res) => {
    try {

        const books = await Books.find({});
        res.json(books)
        
    } catch (error) {
        
    }
}

const checkoutBook = async (req, res) => {
    try {
        const bookId = req.body.bookId;
        const memberId = req.body.memberId;

        const book = await BookModel.findOne({'BookID' :bookId});
        if(!book){
            res.json({
                message: "Book not found!"
            })
        }

        if(book.NumberOfCopies === 0){
            res.json({
                message: "No copies available for checkout"
            })
        }

        const member = await Members.findOne({'MemberID': memberId});
        if(!member) {
            res.json({
                message: "Member not found"
            })
        }

         await Circulation.updateOne({
            member: memberId,
            book: bookId,
            date: new Date()
        })

        // if copies are available, decrease the count and save the book.
        book.NumberOfCopies--;
        await book.save();

        res.send({
            message: "Book checked out successfully!"
        })
    } catch (error) {
        throw new Error(error)
        
    }
}
const getFineForOverdue = async (req, res) => {
    try {
        const memberId = req.body.memberId;
        const sevenDaysAgo = moment(new Date().getDate()- 7).format('YYYY-MM-DD')

        // sevenDaysAgo(sevenDaysAgo);

        //find all circulation records for the given member 
        // where return date is null and issue date os more than 7 days ago

        const overdueCalculation = await Circulation.find({
            member_id: memberId,
            eventtype: "checkout",
            date: {$lt: sevenDaysAgo}
        })

        console.log("overdueCalculation", overdueCalculation);

        let totalFine = 0;
        const overdueBooks = [];

        overdueCalculation.forEach(circulation => {
            const daysOverDue = Math.ceil(new Date() - circulation.issueDate) / (1000 *60 * 60*24)
            
            const fine = daysOverDue*50;
            totalFine += fine;

            overdueBooks.push({
                bookName: circulation.bookName,
                issueDate: circulation.issueDate
            })

            return {totalFine, overdueBooks}
        
        
        })

        res.json({totalFine, overdueBooks})

    } catch (error) {
        console.log(error);
        throw new Error('Error getting fine and overdue for books')
    }
}


module.exports = {checkoutBook, getFineForOverdue, getAllBooks}