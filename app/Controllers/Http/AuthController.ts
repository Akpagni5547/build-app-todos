import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User';

export default class AuthController {
    public showRegister ({ view }: HttpContextContract) {
        return view.render('auth/register')
    }
    public async register({  response, request, auth }: HttpContextContract) {
        const payload = await request.validate(UserValidator)
        const user = await User.create(payload)
        await auth.login(user)
        return response.redirect('/')
    }

    public showLogin ({ view }: HttpContextContract) {
        return view.render('auth/login')
    }

    public async login({  response, request, auth, session }: HttpContextContract) {
        const payload = request.only(['email', 'password'])
        try{
            await auth.attempt(payload.email, payload.password)
            return response.redirect('/')
        } catch(error) {
            session.flash('notification', 'Nous n\'arrivons pas à vérifier vos crédentials')
            return response.redirect('back')
        }
    }

    public async logout ({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.redirect('/')
    }
}
