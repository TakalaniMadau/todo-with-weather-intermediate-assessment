require "rails_helper"

describe TodosController, type: :controller do
  describe "GET #index" do
    it "renders the index template" do
      get :index
      expect(response).to render_template(:index)
    end
  end
  
  describe "GET #show" do
    it "renders the show template" do
      todo = Todo.create!(title: "Test Todo", description: "Test description")
      get :show, params: { id: todo.id }
      expect(response).to render_template(:show)
    end
  end
  
  describe "GET #new" do
    it "renders the new template" do
      get :new
      expect(response).to render_template(:new)
    end
  end
  
  describe "GET #edit" do
    it "renders the edit template" do
      todo = Todo.create!(title: "Test Todo", description: "Test description")
      get :edit, params: { id: todo.id }
      expect(response).to render_template(:edit)
    end
  end
  
  describe "POST #create" do
    it "creates a new todo" do
      expect {
        post :create, params: { todo: { title: "New Todo", description: "New description" } }
      }.to change(Todo, :count).by(1)
    end
    
    it "redirects to the created todo" do
      post :create, params: { todo: { title: "New Todo", description: "New description" } }
      expect(response).to redirect_to(Todo.last)
    end
  end
  
  describe "PATCH #update" do
    it "updates the requested todo" do
      todo = Todo.create!(title: "Old Title", description: "Old description")
      patch :update, params: { id: todo.id, todo: { title: "Updated Title" } }
      todo.reload
      expect(todo.title).to eq("Updated Title")
    end
    
    it "redirects to the todo" do
      todo = Todo.create!(title: "Test Todo", description: "Test description")
      patch :update, params: { id: todo.id, todo: { title: "Updated Title" } }
      expect(response).to redirect_to(todo)
    end
  end
  
  describe "DELETE #destroy" do
    it "destroys the requested todo" do
      todo = Todo.create!(title: "Test Todo", description: "Test description")
      expect {
        delete :destroy, params: { id: todo.id }
      }.to change(Todo, :count).by(-1)
    end
    
    it "redirects to the todos list" do
      todo = Todo.create!(title: "Test Todo", description: "Test description")
      delete :destroy, params: { id: todo.id }
      expect(response).to redirect_to(todos_path)
    end
  end
end