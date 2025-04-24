output "vm_ip" {
  description = "The IP address of the provisioned VM"
  value       = opennebula_virtual_machine.vm[0].ip
}

output "vm_id" {
  description = "The ID of the provisioned VM"
  value       = opennebula_virtual_machine.vm[0].id
}