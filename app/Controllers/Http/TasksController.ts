import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Task from "App/Models/Task";
import TaskValidator from "App/Validators/TaskValidator";

export default class TasksController {
  public async index({ view, auth }: HttpContextContract) {
    const user =  auth.user;
    await user?.preload('tasks')
    return view.render("tasks/index", { helios: user?.tasks });
  }
  public async store({ request, response, session, auth }: HttpContextContract) {
    const validationTasks = await request.validate(TaskValidator);
    await auth.user?.related('tasks').create(validationTasks);
    session.flash({ notification: "Task created successfully" });

    return response.redirect("back");
  }
  public async update({
    response,
    request,
    session,
    params,
  }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);

    task.isCompleted = !!request.input("issCompleted");
    await task.save();
    session.flash("notification", "Task updated successfully");
    return response.redirect("back");
  }
  public async destroy({
    response,
    session,
    params,
  }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);
    await task.delete()
    session.flash("notification", "Task delete successfully");
    return response.redirect("back");
  }
}
