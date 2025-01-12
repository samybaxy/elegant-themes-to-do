import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import App from "./App";

test("renders todo app", () => {
  render(<App />);
  const title = screen.getByText(/ToDo/i);
  expect(title).toBeInTheDocument();
});

test("adds new todos", () => {
  const { container } = render(<App />);

  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });

  expect(container.querySelector(".add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));

  expect(container.querySelector(".todo-list").textContent).toContain(todoText);
  expect(container.querySelector(".add-new-todo").value).not.toContain(
    todoText
  );
});

test("marks todos as complete", async () => {
    render(<App />);
  
    // Add a todo
    const todoText = "Complete the test";
    fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
      target: { value: todoText },
    });
    fireEvent.click(screen.getByText(/\+/i));
  
    // Check if todo is in the list
    const todoItem = await screen.findByText(todoText);
    expect(todoItem).toBeInTheDocument();
  
    // Check the checkbox
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
  
    // Wait for the todo to be marked as complete (assuming there's some visual change)
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });
  
  test("deletes todos", async () => {
    render(<App />);
  
    // Add a todo
    const todoText = "Delete this test";
    fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
      target: { value: todoText },
    });
    fireEvent.click(screen.getByText(/\+/i));
  
    // Check if todo is in the list
    const todoItem = await screen.findByText(todoText);
    expect(todoItem).toBeInTheDocument();
  
    // Delete the todo
    const deleteButton = screen.getByText('X');
    fireEvent.click(deleteButton);
  
    // Wait for the todo to be removed from the list
    await waitFor(() => {
      expect(screen.queryByText(todoText)).not.toBeInTheDocument();
    });
  });
  
  // Bug fix test if there was a bug or to ensure functionality
  test("input field is cleared after adding todo", () => {
    render(<App />);
  
    const todoText = "Clear after add";
    fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
      target: { value: todoText },
    });
    fireEvent.click(screen.getByText(/\+/i));
  
    const input = screen.getByPlaceholderText(/What do you need to do\?/i);
    expect(input.value).toBe("");
  });