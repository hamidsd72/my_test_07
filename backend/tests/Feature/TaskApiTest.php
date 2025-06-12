<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_all_tasks()
    {
        Task::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/tasks');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    /** @test */
    public function it_can_create_a_task()
    {
        $taskData = ['title' => 'simple title test'];

        $response = $this->postJson('/api/v1/tasks', $taskData);

        $response->assertStatus(201)
            ->assertJsonFragment($taskData);
    }

    /** @test */
    public function it_can_update_a_task_status()
    {
        $task = Task::factory()->create(['completed' => true]);

        $response = $this->putJson("/api/v1/tasks/{$task->id}", ['title' => 'Update task', 'completed' => true]);

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/v1/tasks/{$task->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}