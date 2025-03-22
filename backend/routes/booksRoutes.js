import express from 'express'
import {Book} from '../models/bookModel.js'

const router = express.Router();

//Save a new book
router.post('/',async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                msg:'Send all required fields : title, author, publishYear'
            });
        }
        else{
            const newBook = {
                title:request.body.title,
                author:request.body.author,
                publishYear:request.body.publishYear,
            };

            const book = await Book.create(newBook);
            return response.status(201).send(book);
        }

    }catch(err){
        console.log(err.message);
        response.status(500).send({message:err.message});
    }
});


//Get all books
router.get('/',async(request,responce)=>{
    try{
        const books = await Book.find({});

        return responce.status(200).json({
            data:books
        });

    }catch(err){
        console.log(err.message);
        response.status(500).send({message:Error.message});
    }

});


//Get a book by id
router.get('/:id',async(request,responce)=>{
    try{

        const {id} = request.params;

        const book = await Book.findById(id);

        return responce.status(200).json(book);

    }catch(err){
        console.log(err.message);
        response.status(500).send({message:Error.message});
    }

});

//Update a book
router.put('/:id',async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                msg:'Send all required fields : title, author, publishYear'
            });
        }
        else{
            const {id} = request.params;

            const result = await Book.findByIdAndUpdate(id, request.body);

            if(!result){
                return response.status(404).json({message:'Book not found'});
            }
            else{
                return response.status(200).json({message:"Book updated succesfully"});
            }
        }

    }catch(err){
        console.log(err.message);
        response.status(500).send({message:err.message});
    }

});

//Delete a book
router.delete('/:id',async(request,response)=>{
    try{    
        
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Book not found'});
        }
        else{
            return response.status(200).send({message:'Book deleted succesfully'});
        }

    }catch(err){
        console.log(err.message);
        response.status(500).send({message:err.message});
    }

});


export default router;

