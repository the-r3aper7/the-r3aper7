#include <stdio.h>

struct Node {
	int data;
	struct Node* next;
}

void Insert(int x);
void Print(struct Node* head);

int main() {
	int n, x;
	struct Node* head;
	head = NULL; // currently list is empty
	printf("how many numbers? ");
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		printf("Enter the number: ");
		scanf("%d", &x);
		head = Insert(head, x);
		Print(head);
	}
}

struct Node* Insert(struct Node* head, int x) {
	struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
	temp->data = x;
	temp->next = NULL;
	if (head != null) {
		temp->next = head; // this will add new node to beginning of the list.
	}
	head = temp;
	return head
}

void Print(struct Node* head) {
	while (head != NULL) {
		printf("%d ->", temp->data);
		head = head->next;
	}
	printf("\n");
}
