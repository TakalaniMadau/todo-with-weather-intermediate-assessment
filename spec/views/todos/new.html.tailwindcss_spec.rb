require 'rails_helper'

RSpec.describe "todos/new", type: :view do
  before(:each) do
    assign(:todo, Todo.new(
      title: "MyString",
      description: "MyText",
      status: false
    ))
  end

  it "renders new todo form" do
    render

    assert_select "form[action=?][method=?]", todos_path, "post" do

      assert_select "input[name=?]", "todo[title]"

      assert_select "textarea[name=?]", "todo[description]"

      assert_select "input[name=?]", "todo[status]"
    end
  end
end
