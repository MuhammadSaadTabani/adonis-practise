// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from "App/Models/Post";

export default class PostsController {

    public async index({response}){
        const posts = await Post.all();
        return response.ok({
            status: true,
            data: posts
        })
        return response.ok(posts)
    }
}
