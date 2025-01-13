import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
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
  
    // Check the checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
  
    // Wait for the todo to be marked as complete (assuming there's some visual change)
    await waitFor(() => {
        expect(checkboxes[0]).toBeChecked();
    });

    expect(checkboxes[1]).not.toBeChecked();

    // Now, let's mark the second todo as complete
    fireEvent.click(checkboxes[1]);

    // Wait for the second todo to be marked as complete
    await waitFor(() => {
        expect(checkboxes[1]).toBeChecked();
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
  
    const todoItems = screen.getAllByRole('listitem');

    // Assuming "Delete this test" is the second todo added
    const deleteButton = within(todoItems[2]).getByRole('button', { name: /X/i });

    fireEvent.click(deleteButton);

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