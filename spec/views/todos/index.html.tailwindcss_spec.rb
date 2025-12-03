require 'rails_helper'

RSpec.describe "todos/index", type: :view do
  before(:each) do
    Todo.create!(title: "Title 1", description: "MyText 1", status: false)
    Todo.create!(title: "Title 2", description: "MyText 2", status: true)
    assign(:completed, Todo.completed)
    assign(:todos, Todo.todo)
  end

  it "renders a list of todos" do
    render
    expect(rendered).to include("Title 1")
    expect(rendered).to include("MyText 1")
    expect(rendered).to include("Title 2")
    expect(rendered).to include("MyText 2")
  end
end
