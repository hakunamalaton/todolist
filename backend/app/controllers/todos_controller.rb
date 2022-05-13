class TodosController < ApplicationController

    before_action :set_todo, only: [:show, :update, :destroy]

    def index
        @todos = Todo.all
        page =  params[:page] ? params[:page].to_i : nil
        limit = params[:limit] ? params[:limit].to_i : nil
        @todos = page != 0 && limit ? @todos[(page-1)*limit...page*limit] : @todos
        render json: @todos
    end

    def get_all
        render json: params
    end

    def show
        render json: @todo
    end

    def create
        @todo = Todo.new(todo_params)
        
        if @todo.save
            render json: @todo
        else
            render json: @todo.errors, status: unprocessable_entity
        end
    end

    def update
        if @todo.update(todo_params)
            render json: @todo
        else
            render json: @todo.errors, status: unprocessable_entity  
        end
    end

    def destroy
        @todo.destroy
    end

    private

    def set_todo
        @todo = Todo.find(params[:id])
    end

    def todo_params
        params.require(:todo).permit(:id, :title, :completed)
    end
end
