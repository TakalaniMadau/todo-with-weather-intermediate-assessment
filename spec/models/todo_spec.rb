require "rails_helper"

describe Todo do
  let(:todo) { build(:todo) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(todo).to be_valid
    end

    it "is not valid without a title" do
      todo.title = nil
      expect(todo).not_to be_valid
    end

    it "is not valid without a description" do
      todo.description = nil
      expect(todo).not_to be_valid
    end
  end

  describe "scopes" do
    before do
      create_list(:todo, 3, status: true)
      create_list(:todo, 2, status: false)
    end

    it "returns only completed todos" do
      expect(Todo.completed.count).to eq(3)
    end

    it "returns only incomplete todos" do
      expect(Todo.todo.count).to eq(2)
    end
  end
end
