require 'rails_helper'

RSpec.describe "todos/index", type: :view do
  before(:each) do
    assign(:todos, [
      Todo.create!(
        title: "Title",
        description: "MyText",
        status: false
      ),
      Todo.create!(
        title: "Title",
        description: "MyText",
        status: false
      )
    ])
  end

  it "renders a list of todos" do
    render
    assert_select "div", text: Regexp.new("Title".to_s), count: 2
    assert_select "div", text: Regexp.new("MyText".to_s), count: 2
    assert_select "div", text: Regexp.new("Incomplete".to_s), count: 2
  end
end
