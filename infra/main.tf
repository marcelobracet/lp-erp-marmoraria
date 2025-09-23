provider "aws" {
    region = "us-east-1"
}

resource "key_pair" "keypair"{
    key_name = "terraform_keypar"
    public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "securitygroup" {
    name = "securitygroup"
    description = "Allow HTTP and internet access"

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        # Allow HTTP access from anywhere
        cidr_blocks = ["0.0.0.0/0"]
    }

    # Allow SSH access from anywhere
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        # Allow HTTP access from anywhere
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 65535
        protocol = "tcp"
        # Allow all outbound traffic
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_instance" "server" {
  ami = "ami-0c101f26f147fa7fd"
  instance_type = "t2.nano"
#   This line associates the security group created above with the EC2 instance
  vpc_security_group_ids = [aws_security_group.securitygroup.id]
#   when the instance is created, it will run the user_data script
  user_data = file("user_data.sh")
  key_name = aws_key_pair.keypair.key_name
}

