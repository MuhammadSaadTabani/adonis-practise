// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from "App/Models/Post";
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class PostsController {

    public async validateRequest(request){
        const postSchema = schema.create({
            title: schema.string({trim: true},[
                rules.maxLength(255),
            ]),
            content: schema.string({escape: true},[
                rules.maxLength(1000),
            ])
        });
        const payload: any = await request.validate({schema: postSchema});
        return payload;
    }

    public async index({response}){
        const posts = await Post.all();
        return response.ok({
            status: true,
            data: posts
        })
    }

    public async store({request, response}){
        

        const validate = await this.validateRequest(request)
        const post: Post = await Post.create(validate);

        return response.ok(post)
    }

    public async show({params, response}){
        const {id}: {id: Number} = params;
        const post: any = await Post.find(id);

        if(!post){
            return response.json({
                success: false,
            });
        }
        return response.json({
            success: true,
            data: post
        })
    }

    public async update({params, request, response}) {
        const id: {id: Number} = params;
        const post = await Post.find(id);
        if(!post){
            return response.json({
                success: false,
                message: "Post not found",
            });
        }
        const postSchema = schema.create({
            title: schema.string({ trim: true }, [
                rules.maxLength(255)
            ]),
            content: schema.string({ escape: true }, [
                rules.maxLength(1000)
            ]),
        })

        const payload: any = await request.validate({ schema: postSchema })
        post.title = payload.title;
        post.content = payload.content;

        await post.save();

        return response.json({
            success: true,
            message: "Updated Successfully",
            data: post
        })
    }

    public async destroy({params, response}){
        const id: {id: Number} = params;

    }

}
