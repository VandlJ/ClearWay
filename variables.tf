variable "one_username" {
  description = "OpenNebula username" 
}

variable "one_password" {
  description = "OpenNebula login token"
}

variable "one_endpoint" {
  description = "OpenNebula endpoint URL"
  default = "https://nuada.zcu.cz/RPC2"
}

variable "vm_ssh_pubkey" {
  description = "SSH public key for VM access"
}

variable "vm_image_name" {
  description = "Name of the VM image to be used"
}

variable "vm_image_url" {
  description = "URL of the VM image to be used"
}

variable "vm_instance_count" {
  description = "Number of VM instances to create"
  type = number
  default = 1
}

variable "vm_imagedatastore_id" {
    description = "Open Nebula datastore ID"
    default = 101 # => "nuada_pool"
}

variable "vm_network_id" {
    description = "ID of the virtual network to attach to the virtual machine"
    default = 3 # => "vlan173"
}