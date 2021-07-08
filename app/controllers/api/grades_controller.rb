class Api::GradesController < ApplicationController

    def index
        render json: Grade.all_and_then_some
    end

    def create
        grade = Grade.new(grade_params)
        if(grade.save)
            render json: 
            {   id: grade.id, 
                score: grade.score, 
                userName: grade.user.name, 
                skillName: grade.skill.name}
        else
            render json: grade, status: 422
        end
    end

    private

    def grade_params
        params.require(:grade).permit(:score, :user_id, :skill_id)
    end



end
