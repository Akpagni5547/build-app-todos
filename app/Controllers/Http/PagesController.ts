import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
    public index({view}:HttpContextContract){
return view.render('tasks/index')
    }
    public store({view}:HttpContextContract){
        return view.render('tasks/index')
            }
}
